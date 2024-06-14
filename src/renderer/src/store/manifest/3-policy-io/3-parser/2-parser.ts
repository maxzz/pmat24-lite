import { ChSet, Group, Range, Rule, RulesAndMeta } from "./1-parser-types";
import { ParseError, ParseErrorType } from "./4-parser-error";
import { isCharNumber, isCharHexNumber } from "../3-verify-generate/9-gen-utils/9-utils-cpp";

export const WSHORTHAND_d = "0123456789";
export const WSHORTHAND_a = "abcdefghijklmnopqrstuvwxyz";
export const WSHORTHAND_A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const WSHORTHAND_s = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // 21-2F, 3A-40, 5B-60, 7B-7E

function getShorthandChSet(shorthand: string, pos: number): string {
    switch (shorthand) {
        case 'd': return WSHORTHAND_d;
        case 'a': return WSHORTHAND_a;
        case 'A': return WSHORTHAND_A;
        case 's': return WSHORTHAND_s;
        default: {
            throw new ParseError("unexpected shorthand", ParseErrorType.unexpShorthand, pos);
        }
    }
}

type NextChar = { ch: string, hasChar: boolean; };
type NextNumber = { num: number, hasChar: boolean; };

export class PolicyParser {
    sourceText: string = '';    // Source text to parse.
    rulesAndMeta: RulesAndMeta = new RulesAndMeta();
    sourceTextPos: number = 0;  // Current parsing position starting from 0, but at error time it's +1 already.

    public doParse({ custom, minTotal, maxTotal }: { custom: string; minTotal: number; maxTotal: number; }) {
        this.sourceText = custom;
        this.sourceTextPos = 0;
        this.rulesAndMeta = new RulesAndMeta();

        this.parse_start();

        // Set conditionally minTotal and maxTotal from UI if not set by custom rule
        this.rulesAndMeta.targetMin === -1 && (this.rulesAndMeta.targetMin = minTotal);
        this.rulesAndMeta.targetMax === -1 && (this.rulesAndMeta.targetMax = maxTotal);
    }

    private skipWhitespace() {
        while (this.sourceTextPos < this.sourceText.length) {
            const { ch, hasChar } = this.getCharNoThrow();
            if (!hasChar) {
                return;
            }

            switch (ch) {
                case ' ':
                case '\t':
                    break;
                default: {
                    this.ungetChar();
                    return;
                }
            }
        }
    }

    private hasChar(): boolean { // hasNextChar
        const rv = this.sourceTextPos < this.sourceText.length;
        return rv;
    }

    private ungetChar(): void {
        if (this.sourceTextPos <= 0) {
            console.error("impossible: no more unget"); // This is just internal error and should be fixed in logic.
            return;
        }
        this.sourceTextPos--;
    }

    private getChar(): string { // getNextChar
        if (!this.hasChar()) {
            throw new ParseError("no more text", ParseErrorType.expMoreText, this.sourceTextPos);
        }

        const rv = this.sourceText[this.sourceTextPos];
        this.sourceTextPos++;
        return rv;
    }

    private getCharNoThrow(): NextChar { // Internal method to avoid recursion with skipWhitespace and getNumberIfExistWs.
        if (!this.hasChar()) {
            return { ch: '', hasChar: false };
        }

        const rv: NextChar = {
            ch: this.sourceText[this.sourceTextPos++],
            hasChar: true
        };
        return rv;
    }

    private getCharIfExistWs(): NextChar { // Skip whitespace and get next character.
        this.skipWhitespace();

        return this.getCharNoThrow();
    }

    private expectedCharWs(expected: string): void { // Skip whitespace and check next character.
        this.skipWhitespace();

        const { ch, hasChar } = this.getCharNoThrow();
        if (!hasChar || ch !== expected) {
            throw new ParseError(`expected '${expected}'`, ParseErrorType.expChar, this.sourceTextPos, expected);
        }
    }

    private getNumberIfExistWs(): NextNumber { // Skip whitespace and get number.
        this.skipWhitespace();

        let buffer = '';

        while (true) {
            const { ch, hasChar } = this.getCharNoThrow();
            if (!hasChar) {
                break;
            }

            let gotDigit = isCharNumber(ch);
            if (!gotDigit) {
                this.ungetChar();
                break;
            }

            buffer += ch;
        }

        if (!buffer) {
            return { num: -1, hasChar: false };
        }

        const rv: NextNumber = {
            num: parseInt(buffer),
            hasChar: true
        };
        return rv;
    }

    private getRangeEntryWs(OPEN_: string, CLOSE_: string): Range { // Get range if exist.
        const rv: Range = { min: -1, max: -1 };

        const { ch, hasChar } = this.getCharIfExistWs();
        if (!hasChar) {
            return rv;
        }

        if (ch !== OPEN_) {
            this.ungetChar();
            return rv;
        }

        const { num: min, hasChar: hasN } = this.getNumberIfExistWs();
        rv.min = min;
        if (!hasChar || isNaN(min)) {
            throw new ParseError("expected number", ParseErrorType.expNum, this.sourceTextPos);
        }

        this.skipWhitespace();
        if (this.getChar() === CLOSE_) {
            rv.max = rv.min; // Simplified version of length <2,2> as <2>.
            return rv;
        }
        this.ungetChar();
        this.expectedCharWs(',');

        const { num: max, hasChar: hasM } = this.getNumberIfExistWs();
        rv.max = max;
        if (!hasM || isNaN(max)) {
            rv.max = -2; //range.min;
        }

        this.expectedCharWs(CLOSE_);
        if (hasM) {
            if (rv.min > rv.max) {
                throw new ParseError("invalid range", ParseErrorType.invRange, this.sourceTextPos);
            }
        }
        return rv;
    }

    private parse_finalPswLength(): Range { // Get final length of password: <2,2> or <2>.
        const rv: Range = this.getRangeEntryWs('<', '>');

        if (rv.max === -1) {
            rv.max = rv.min;
        }

        return rv;
    }

    private parse_range(rv: ChSet | Group): void { // Allowed notation for ranges: {2,4} or {2,2} or {2} or {2,}
        const minmax: Range = this.getRangeEntryWs('{', '}');
        rv.min = minmax.min;
        rv.max = minmax.max;
    }

    private getCharOfCharset(): string { // single character like: a b \u1234 \U1234 \u+1234 \U+1234 \u-1234 \U-1234
        let ch = '';

        ch = this.getChar();
        if (ch !== '\\') {
            return ch; // Not an escape then return as it is.
        }

        ch = this.getChar();
        if (ch !== 'u' && ch !== 'U') {
            return ch; // Not an unicode then return as it is.
        }

        ch = this.getChar();
        if (ch !== '+' && ch !== '-') {
            this.ungetChar(); // Don't eat if it is not an optional '+' or '-'.
        }

        // Get 4 hexidecimal digits.

        let buffer = '';
        let i = 0;
        while (i++ < 4) {
            ch = this.getChar();

            let gotDigit = isCharHexNumber(ch);
            if (!gotDigit) {
                throw new ParseError("expected digit", ParseErrorType.expDigit, this.sourceTextPos);
            }

            buffer += ch;
        }

        // Convert number to character.

        const number = parseInt(buffer, 16);

        if (isNaN(number) || number > 0xFFFF || number < 0) {
            throw new ParseError("expected 4 hex digits", ParseErrorType.exp4Digits, this.sourceTextPos);
        }

        const rv = String.fromCharCode(number);
        return rv;
    }

    private parse_charset(): string { // single character sets (don't skip whitespace) like: [a-z02 A-M-ZZY02-1]
        let rv_chSet = '';

        let ch = this.getChar();

        let isSquareBrStart = ch === '[';
        if (ch !== '[') {
            this.ungetChar(); // Eat only '['
        }

        while (true) {
            ch = this.getChar();

            if (ch === ']') { // Check if it is the end of character set and we started with '['.
                if (!isSquareBrStart) {
                    throw new ParseError("unexpected '[' before ']'", ParseErrorType.unexpChSetClose, this.sourceTextPos); // expected charset beging before closing.
                }

                if (!rv_chSet) {
                    throw new ParseError("unexpected empty charset", ParseErrorType.chSetEmpty, this.sourceTextPos);
                }

                return rv_chSet;
            }

            let isRange = false;

            if (ch === '-') { // If it is a range of characters then eat this character.
                if (!rv_chSet) {
                    throw new ParseError("expected lower boundary char before '-'", ParseErrorType.expLowBoundCh, this.sourceTextPos);
                }

                ch = this.getChar(); // Check that we don't have '[--1]'. '-' should be escaped.
                if (ch === '-') {
                    throw new ParseError("unexpected double '--'", ParseErrorType.unexpDoubleSet, this.sourceTextPos);
                }

                this.ungetChar();

                isRange = true;
            } else {
                this.ungetChar();
            }

            let chCharset = this.getCharOfCharset();

            if (isRange) {
                let chFirst = rv_chSet[rv_chSet.length - 1]; // Cut the last char and use it as a first of range.
                rv_chSet = rv_chSet.substring(0, rv_chSet.length - 1);

                rv_chSet = generateCharRange(chFirst, chCharset, rv_chSet, this.sourceTextPos);
                isRange = false;
            } else {
                rv_chSet += chCharset;
            }

        } //while

        function generateCharRange(chFirst: string, chSecond: string, rv_chSet: string, pos: number): string {
            // Generate (chFirst=a,chSecond=c as a-c -> abc), make sure that characters are unique in set, and sort.

            if (chFirst > chSecond) {
                throw new ParseError("expected set n <= m", ParseErrorType.expCharALessB, pos);
            }

            while (chFirst <= chSecond) {
                let isNew = rv_chSet.indexOf(chFirst) === -1;
                if (isNew) {
                    rv_chSet += chFirst;
                }
                chFirst = String.fromCharCode(chFirst.charCodeAt(0) + 1);
            }

            rv_chSet = rv_chSet.split('').sort().join(''); // i.e. "acb" -> "abc"

            // for (wchar_t a = chFirst; a <= chSecond; a++)
            // {
            //     bool isNew = rv_charset_.find_first_of(a) === wstring_t::npos;
            //     if (!isNew) {
            //         continue;
            //     }

            //     rv_charset_ += a;
            // }

            //     std:: sort(rv_charset_.begin(), rv_charset_.end(), std:: less<wchar_t>()); // i.e. "abc"

            return rv_chSet;
        }
    }

    private parse_group(): Rule { // '(' Rules ')' '.' // Range is handled outside.
        let rv: Rule = new Rule();

        let ch = this.getChar();
        if (ch !== '(') {
            throw new ParseError("expected '('", ParseErrorType.expChar, this.sourceTextPos, '('); // This is just internal error and should be fixed in logic. //ungetChar(); // Eat only '('
        }

        rv.group.rules = this.parse_rules();

        ch = this.getChar();
        if (ch !== ')') {
            throw new ParseError("expected ')'", ParseErrorType.expChar, this.sourceTextPos, ')'); // Expected end of group.
        }

        const { ch: ch2, hasChar } = this.getCharIfExistWs();
        if (hasChar) {
            if (ch2 === '.') {
                rv.group.mix = false;
            }
            else {
                this.ungetChar();
            }
        }

        return rv;
    }

    private parse_rule(): Rule { // single rule like: 'a{1,2}' 'A{1,1}' '[0-9]{1,1}' '(a{1,2}).{1,2}'
        let rv: Rule = new Rule();

        const { ch, hasChar } = this.getCharIfExistWs();
        if (!hasChar) {
            return rv;
        }

        switch (ch) {
            case '(': { // group
                this.ungetChar();
                rv = this.parse_group();
                rv.isGroup = true;
                this.parse_range(rv.group);
                break;
            }
            case '[': { // charset
                this.ungetChar();
                rv.chSet.chars = this.parse_charset();
                rv.isGroup = false;
                this.parse_range(rv.chSet);

                if (rv.chSet.chars.length > 1024) {
                    throw new ParseError("expected less then 1024 per charset", ParseErrorType.moreThen1024, this.sourceTextPos); // Charsets can be splited into different sets and then grouped together.
                }
                break;
            }
            case 'd': // shorthand d
            case 'a': // shorthand a
            case 'A': // shorthand A
            case 's': { // shorthand s
                rv.chSet.chars = getShorthandChSet(ch, this.sourceTextPos);
                rv.isGroup = false;
                this.parse_range(rv.chSet);
                break;
            }
            default: {
                throw new ParseError("unexpected char", ParseErrorType.unexpChar, this.sourceTextPos, ch);
            }
        }

        return rv;
    }

    private parse_rules(): Rule[] { // sequence of character sets like: a{1,2}A{1,1}[0-9]{1,1}
        const rv: Rule[] = [];

        while (true) {
            const { ch, hasChar } = this.getCharNoThrow();
            if (!hasChar) {
                return rv;
            }

            switch (ch) {
                case '(': // group
                case '[': // charset
                case 'd': // shorthand d
                case 'a': // shorthand a
                case 'A': // shorthand A
                case 's': { // shorthand s
                    this.ungetChar();
                    const newRule = this.parse_rule();
                    rv.push(newRule);
                    break;
                }
                default: {
                    this.ungetChar();
                    return rv;
                }
            }
        }
    }

    private parse_start(): void {
        while (true) {

            const { ch, hasChar } = this.getCharIfExistWs();
            if (!hasChar) {
                return;
            }

            switch (ch) {
                case '~': { // To avoid the same character be used consecutively (global),
                    this.rulesAndMeta.noRepeat = true;
                    break;
                }
                case '&': { // To avoid the same character in the same position from its previous value (recent one only).
                    this.rulesAndMeta.noPrevPos = true;
                    break;
                }
                case '(': // group
                case '[': // charset
                case 'd': // shorthand d
                case 'a': // shorthand a
                case 'A': // shorthand A
                case 's': { // shorthand s
                    this.ungetChar();
                    this.rulesAndMeta.rules = this.parse_rules();
                    break;
                }
                case '<': { // final psw length can be at the begin or at the end of input string.
                    this.ungetChar();
                    const range: Range = this.parse_finalPswLength();
                    this.rulesAndMeta.targetMin = range.min;
                    this.rulesAndMeta.targetMax = range.max;
                    break;
                }
                default: {
                    throw new ParseError(`unexpected char '${ch}'`, ParseErrorType.unexpChar, this.sourceTextPos, ch);
                }
            }
        }
    }

} //class PolicyParser
