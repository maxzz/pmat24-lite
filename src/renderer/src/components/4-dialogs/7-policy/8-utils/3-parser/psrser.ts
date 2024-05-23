import { ParseError, ParseErrorType, Range, Rule, RulesExtra } from "../2-adv-psw-policy";
import { isCharNumber, isCharHexNumber } from "../cpp-utils";

const WSHORTHAND_d = "0123456789";
const WSHORTHAND_a = "abcdefghijklmnopqrstuvwxyz";
const WSHORTHAND_A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const WSHORTHAND_s = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // 21-2F, 3A-40, 5B-60, 7B-7E

/*static*/ function generateShorthandSet(shorthand_: string): string {
    switch (shorthand_) {
        case 'd': return WSHORTHAND_d;
        case 'a': return WSHORTHAND_a;
        case 'A': return WSHORTHAND_A;
        case 's': return WSHORTHAND_s;
        default: {
            throw new ParseError("unexpected shorthand", ParseErrorType.errUnexpShorthand);
        }
    }
}

type NextChar = { ch: string, hasChar: boolean; };
type NextNumber = { num: number, hasChar: boolean; };

export class PolicyParser {
    sourceText: string = '';    // Source text to parse.
    rulesExtra: RulesExtra = new RulesExtra();
    sourceTextPos: number = 0;  // Current parsing position starting from 0, but at error time it's +1 already.

    public doParse() {
        this.sourceTextPos = 0;
        this.rulesExtra.rules = [];

        this.parse_start();

        console.log("Done");
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
        let rv = this.sourceTextPos < this.sourceText.length;
        return rv;
    }

    private ungetChar(): void {
        if (this.sourceTextPos <= 0) {
            console.log("impossible: no more unget"); // This is just internal error and should be fixed in logic.
            return;
        }
        this.sourceTextPos--;
    }

    private getChar(): string { // getNextChar
        if (!this.hasChar()) {
            throw new ParseError("no more text", ParseErrorType.errExpMoreText);
        }

        let rv = this.sourceText[this.sourceTextPos];
        this.sourceTextPos++;

        return rv;
    }

    private getCharNoThrow(): NextChar { // Internal method to avoid recursion with skipWhitespace and getNumberIfExistWs.
        if (!this.hasChar()) {
            return { ch: '', hasChar: false };
        }

        let rv = {
            ch: this.sourceText[this.sourceTextPos],
            hasChar: true
        };

        return rv;
    }

    private getCharIfExistWs(): NextChar { // Skip whitespace and get next character.
        this.skipWhitespace();

        const rv = this.getCharNoThrow();
        return rv;
    }

    private ExpectedCharWs(expected_: string): void { // Skip whitespace and check next character.
        this.skipWhitespace();

        let ch = this.getChar();
        if (ch != expected_) {
            throw new ParseError("expected" + expected_, ParseErrorType.errExpChar, expected_);
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

        let rv = {
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

        if (ch != OPEN_) {
            this.ungetChar();
            return rv;
        }

        const { num: min, hasChar: hasN } = this.getNumberIfExistWs();
        rv.min = min;
        if (!hasChar || isNaN(min)) {
            throw new ParseError("expected number", ParseErrorType.errExpNum);
        }

        this.skipWhitespace();
        if (this.getChar() == CLOSE_) {
            rv.max = rv.min; // Simplified version of length <2,2> as <2>.
            return rv;
        }
        this.ungetChar();
        this.ExpectedCharWs(',');

        const { num: max, hasChar: hasM } = this.getNumberIfExistWs();
        rv.max = max;
        if (!hasM || isNaN(max)) {
            rv.max = -2; //rangeEntry_.m_min;
        }

        this.ExpectedCharWs(CLOSE_);
        if (hasM) {
            if (rv.min > rv.max) {
                throw new ParseError("invalid range", ParseErrorType.errInvRange);
            }
        }
        return rv;
    }

    private parse_finalPswLength(): Range { // Get final length of password: <2,2> or <2>.
        let rv: Range = this.getRangeEntryWs('<', '>');

        if (rv.max == -1) {
            rv.max = rv.min;
        }

        return rv;
    }

    private parse_range(): Range { // Allowed notation for ranges: {2,4} or {2,2} or {2} or {2,}
        return this.getRangeEntryWs('{', '}');
    }

    private getCharOfCharset(): string { // single character like: a b \u1234 \U1234 \u+1234 \U+1234 \u-1234 \U-1234
        let rv_char_ = '';

        let ch = '';
        ch = this.getChar();

        if (ch != '\\') {
            return ch; // Not an escape then return as it is.
        }

        ch = this.getChar();
        if (ch != 'u' && ch != 'U') {
            return ch; // Not an unicode then return as it is.
        }

        ch = this.getChar();
        if (ch != '+' && ch != '-') {
            this.ungetChar(); // Don't eat if it is not an optional '+' or '-'.
        }

        // Get 4 hexidecimal digits.

        let buffer = '';
        let i = 0;
        while (i++ < 4) {
            ch = ch = this.getChar();

            let gotDigit = isCharHexNumber(ch);
            if (!gotDigit) {
                throw new ParseError("expected digit", ParseErrorType.errExpDigit);
            }

            buffer += ch;
        }

        // Convert to wchar_t

        let number = parseInt(buffer, 16);

        if (isNaN(number) || number > 0xFFFF || number < 0) {
            throw new ParseError("expected 4 hex digits", ParseErrorType.errExp4Digits);
        }

        const rv = String.fromCharCode(number);
        return rv;

        // rv_char_ = `0x${number.toString(16)}`; // 0xff -> '0xff'
        // return rv_char_;
    }

    private parse_charset(): string { // single character sets (don't skip whitespace) like: [a-z02 A-M-ZZY02-1]
        let rv_charset_ = '';

        let ch = this.getChar();
        let isSquareBrStart = ch == '[';
        if (ch != '[') {
            this.ungetChar(); // Eat only '['
        }

        while (true) {
            ch = this.getChar();

            if (ch == ']') { // Check if it is the end of character set and we started with '['.
                if (!isSquareBrStart) {
                    throw new ParseError("unexpected '[' before ']'", ParseErrorType.errUnexpChSetClose); // expected charset beging before closing.
                }

                if (!rv_charset_) {
                    throw new ParseError("unexpected empty charset", ParseErrorType.errChSetEmpty);
                }
                
                return rv_charset_;
            }

            let isRange = false;

            if (ch == '-') { // If it is a range of characters then eat this character.
                if (!rv_charset_) {
                    throw new ParseError("expected lower boundary char before '-'", ParseErrorType.errExpLowBoundCh);
                }

                ch = this.getChar(); // Check that we don't have '[--1]'. '-' should be escaped.
                if (ch == '-') {
                    throw new ParseError("unexpected double '--'", ParseErrorType.errUnexpDoubleSet);
                }

                this.ungetChar();

                isRange = true;
            } else {
                this.ungetChar();
            }

            let chCharset = this.getCharOfCharset();

            if (isRange) {
                let chFirst = rv_charset_[rv_charset_.length - 1]; // Cut the last char and use it as a first of range.
                rv_charset_ = rv_charset_.substring(0, rv_charset_.length - 1);

                rv_charset_ = generateCharRange(chFirst, chCharset, rv_charset_);
                isRange = false;
            } else {
                rv_charset_ += chCharset;
            }

        } //while

        /*static*/ function generateCharRange(chFirst: string, chSecond: string, rv_charset_: string): string {
            // 0. Generate (chFirst=a,chSecond=c as a-c -> abc), make sure that characters are unique in set, and sort.

            if (chFirst > chSecond) {
                throw new ParseError("expected set n <= m", ParseErrorType.errExpCharALessB);
            }

            while (chFirst <= chSecond) {
                let isNew = rv_charset_.indexOf(chFirst) === -1;
                if (isNew) {
                    rv_charset_ += chFirst;
                }
                chFirst = String.fromCharCode(chFirst.charCodeAt(0) + 1);
            }

            rv_charset_ = rv_charset_.split('').sort().join(''); // i.e. "acb" -> "abc"

            // for (wchar_t a = chFirst; a <= chSecond; a++)
            // {
            //     bool isNew = rv_charset_.find_first_of(a) == wstring_t::npos;
            //     if (!isNew) {
            //         continue;
            //     }

            //     rv_charset_ += a;
            // }

            //     std:: sort(rv_charset_.begin(), rv_charset_.end(), std:: less<wchar_t>()); // i.e. "abc"

            return rv_charset_;
        }
    }

    private parse_group(): Rule { // '(' Rules ')' '.' // Range is handled outside.
        let ruleEntry_: Rule = new Rule();

        let ch = this.getChar();
        if (ch != '(') {
            throw new ParseError("expected '('", ParseErrorType.errExpChar, '('); // This is just internal error and should be fixed in logic. //ungetChar(); // Eat only '('
        }

        ruleEntry_.group.rules = this.parse_rules();

        ch = this.getChar();
        if (ch != ')') {
            throw new ParseError("expected ')'", ParseErrorType.errExpChar, ')'); // Expected end of group.
        }

        const { ch: ch2, hasChar } = this.getCharIfExistWs();

        if (hasChar) {
            if (ch2 == '.') {
                ruleEntry_.group.mix = false;
            }
            else {
                this.ungetChar();
            }
        }

        return ruleEntry_;
    }

    private parse_rule(): Rule { // single rule like: 'a{1,2}' 'A{1,1}' '[0-9]{1,1}' '(a{1,2}).{1,2}'
        let ruleEntry_: Rule = new Rule();

        const { ch, hasChar } = this.getCharIfExistWs();
        if (!hasChar) {
            return ruleEntry_;
        }

        switch (ch) {
            case '(': { // group
                this.ungetChar();
                ruleEntry_ = this.parse_group();
                ruleEntry_.isGroup = true;
                ruleEntry_.group.range = this.parse_range();
                break;
            }
            case '[': { // charset
                this.ungetChar();
                ruleEntry_.chSet.chars = this.parse_charset();
                ruleEntry_.isGroup = false;
                ruleEntry_.chSet.range = this.parse_range();

                if (ruleEntry_.chSet.chars.length > 1024) {
                    throw new ParseError("expected less then 1024 per charset", ParseErrorType.errMoreThen1024); // Charsets can be splited into different sets and then grouped together.
                }
                break;
            }
            case 'd': // shorthand d
            case 'a': // shorthand a
            case 'A': // shorthand A
            case 's': { // shorthand s
                ruleEntry_.chSet.chars = generateShorthandSet(ch);
                ruleEntry_.isGroup = false;
                ruleEntry_.chSet.range = this.parse_range();
                break;
            }
            default: {
                throw new ParseError("unexpected char", ParseErrorType.errUnexpChar, ch);
            }
        }

        return ruleEntry_;
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
                case 'd': // shorthand d
                case 'a': // shorthand a
                case 'A': // shorthand A
                case 's': // shorthand s
                case '[': { // charset
                    this.ungetChar();
                    let ruleEntry = this.parse_rule();
                    rv.push(ruleEntry);
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
                    this.rulesExtra.avoidConsecutiveChars = true;
                    break;
                }
                case '&': { // To avoid the same character in the same position from its previous value (recent one only).
                    this.rulesExtra.checkPrevPswCharPosition = true;
                    break;
                }
                case '(': // group
                case '[': // charset
                case 'd': // shorthand d
                case 'a': // shorthand a
                case 'A': // shorthand A
                case 's': { // shorthand s
                    this.ungetChar();
                    this.rulesExtra.rules = this.parse_rules();
                    break;
                }
                case '<': { // final psw length can be at the begin or at the end of input string.
                    this.ungetChar();
                    this.rulesExtra.pswLenRange = this.parse_finalPswLength();
                    break;
                }
                default: {
                    throw new ParseError("unexpected char", ParseErrorType.errUnexpChar, ch);
                }
            }
        }
    }

} //class PolicyParser
