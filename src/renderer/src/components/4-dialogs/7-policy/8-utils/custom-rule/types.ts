import { parseError, ParseerrorType_t, rulesSet_t, rangeEntry_t, ruleEntry_t, ruleEntries_t } from "../1-adv-psw-policy";
import { isCharHexNumber, isCharNumber } from "../cpp-utils";
import { password } from "../types";

export namespace advancedpswpolicy {

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
                throw new parseError("unexpected shorthand", ParseerrorType_t.errUnexpShorthand);
            }
        }
    }

    type NextChar = { ch: string, hasChar: boolean; };
    type NextNumber = { num: number, hasChar: boolean; };

    class apparser_t {
        //public:
        m_sourceText: string = ''; // Source text to parse.
        m_rulesSet: rulesSet_t = new rulesSet_t();
        m_sourceTextPos: number = 0; // Current parsing position starting from 0, but at error time it's +1 already.

        doparse() {
            this.m_sourceTextPos = 0;
            this.m_rulesSet.m_ruleEntries = [];

            this.parse_start();

            console.log("Done");
        } //doparse()

        //private:

        skipWhitespace() {
            while (this.m_sourceTextPos < this.m_sourceText.length) {
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

        hasChar(): boolean { // hasNextChar
            let rv = this.m_sourceTextPos < this.m_sourceText.length;
            return rv;
        }

        ungetChar(): void {
            if (this.m_sourceTextPos <= 0) {
                console.log("impossible: no more unget"); // This is just internal error and should be fixed in logic.
                return;
            }
            this.m_sourceTextPos--;
        }

        getChar(): string { // getNextChar
            if (!this.hasChar()) {
                throw new parseError("no more text", ParseerrorType_t.errExpMoreText);
            }

            let rv = this.m_sourceText[this.m_sourceTextPos];
            this.m_sourceTextPos++;

            return rv;
        }

        getCharNoThrow(): NextChar { // Internal method to avoid recursion with skipWhitespace and getNumberIfExistWs.
            if (!this.hasChar()) {
                return { ch: '', hasChar: false };
            }

            let rv = {
                ch: this.m_sourceText[this.m_sourceTextPos],
                hasChar: true
            };

            return rv;
        }

        getCharIfExistWs(): NextChar { // Skip whitespace and get next character.
            this.skipWhitespace();

            const rv = this.getCharNoThrow();
            return rv;
        }

        ExpectedCharWs(expected_: string): void { // Skip whitespace and check next character.
            this.skipWhitespace();

            let ch = this.getChar();
            if (ch != expected_) {
                throw new parseError("expected" + expected_, ParseerrorType_t.errExpChar, expected_);
            }
        }

        getNumberIfExistWs(): NextNumber { // Skip whitespace and get number.
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

        getRangeEntryWs(OPEN_: string, CLOSE_: string): rangeEntry_t { // Get range if exist.
            const rv: rangeEntry_t = { m_min: -1, m_max: -1 };

            const { ch, hasChar } = this.getCharIfExistWs();
            if (!hasChar) {
                return rv;
            }

            if (ch != OPEN_) {
                this.ungetChar();
                return rv;
            }

            const { num: min, hasChar: hasN } = this.getNumberIfExistWs();
            rv.m_min = min;
            if (!hasChar || isNaN(min)) {
                throw new parseError("expected number", ParseerrorType_t.errExpNum);
            }

            this.skipWhitespace();
            if (this.getChar() == CLOSE_) {
                rv.m_max = rv.m_min; // Simplified version of length <2,2> as <2>.
                return rv;
            }
            this.ungetChar();
            this.ExpectedCharWs(',');

            const { num: max, hasChar: hasM } = this.getNumberIfExistWs();
            rv.m_max = max;
            if (!hasM || isNaN(max)) {
                rv.m_max = -2; //rangeEntry_.m_min;
            }

            this.ExpectedCharWs(CLOSE_);
            if (hasM) {
                if (rv.m_min > rv.m_max) {
                    throw new parseError("invalid range", ParseerrorType_t.errInvRange);
                }
            }
            return rv;
        }

        parse_finalPswLength(): rangeEntry_t { // Get final length of password: <2,2> or <2>.
            let rv: rangeEntry_t = this.getRangeEntryWs('<', '>');

            if (rv.m_max == -1) {
                rv.m_max = rv.m_min;
            }

            return rv;
        }

        parse_range(): rangeEntry_t { // Allowed notation for ranges: {2,4} or {2,2} or {2} or {2,}
            return this.getRangeEntryWs('{', '}');
        }

        getCharOfCharset(): string { // single character like: a b \u1234 \U1234 \u+1234 \U+1234 \u-1234 \U-1234
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
                    throw new parseError("expected digit", ParseerrorType_t.errExpDigit);
                }

                buffer += ch;
            }

            // Convert to wchar_t

            let number = parseInt(buffer, 16);

            if (isNaN(number) || number > 0xFFFF || number < 0) {
                throw new parseError("expected 4 hex digits", ParseerrorType_t.errExp4Digits);
            }

            const rv = String.fromCharCode(number);
            return rv;

            // rv_char_ = `0x${number.toString(16)}`; // 0xff -> '0xff'
            // return rv_char_;
        }

        parse_charset(): string { // single character sets (don't skip whitespace) like: [a-z02 A-M-ZZY02-1]
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
                        throw new parseError("unexpected '[' before ']'", ParseerrorType_t.errUnexpChSetClose); // expected charset beging before closing.
                    }

                    if (!rv_charset_) {
                        throw new parseError("unexpected empty charset", ParseerrorType_t.errChSetEmpty);
                    }
                    
                    return rv_charset_;
                }

                let isRange = false;

                if (ch == '-') { // If it is a range of characters then eat this character.
                    if (!rv_charset_) {
                        throw new parseError("expected lower boundary char before '-'", ParseerrorType_t.errExpLowBoundCh);
                    }

                    ch = this.getChar(); // Check that we don't have '[--1]'. '-' should be escaped.
                    if (ch == '-') {
                        throw new parseError("unexpected double '--'", ParseerrorType_t.errUnexpDoubleSet);
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
                    throw new parseError("expected set n <= m", ParseerrorType_t.errExpCharALessB);
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

        parse_group(): ruleEntry_t { // '(' Rules ')' '.' // Range is handled outside.
            let ruleEntry_: ruleEntry_t = new ruleEntry_t();

            let ch = this.getChar();
            if (ch != '(') {
                throw new parseError("expected '('", ParseerrorType_t.errExpChar, '('); // This is just internal error and should be fixed in logic. //ungetChar(); // Eat only '('
            }

            ruleEntry_.m_groupEntry.m_ruleEntries = this.parse_rules();

            ch = this.getChar();
            if (ch != ')') {
                throw new parseError("expected ')'", ParseerrorType_t.errExpChar, ')'); // Expected end of group.
            }

            const { ch: ch2, hasChar } = this.getCharIfExistWs();

            if (hasChar) {
                if (ch2 == '.') {
                    ruleEntry_.m_groupEntry.m_mix = false;
                }
                else {
                    this.ungetChar();
                }
            }

            return ruleEntry_;
        }

        parse_rule(): ruleEntry_t { // single rule like: 'a{1,2}' 'A{1,1}' '[0-9]{1,1}' '(a{1,2}).{1,2}'
            let ruleEntry_: ruleEntry_t = new ruleEntry_t();

            const { ch, hasChar } = this.getCharIfExistWs();
            if (!hasChar) {
                return ruleEntry_;
            }

            switch (ch) {
                case '(': { // group
                    this.ungetChar();
                    ruleEntry_ = this.parse_group();
                    ruleEntry_.m_isgroup = true;
                    ruleEntry_.m_groupEntry.m_rangeEntry = this.parse_range();
                    break;
                }
                case '[': { // charset
                    this.ungetChar();
                    ruleEntry_.m_chsetEntry.m_charset = this.parse_charset();
                    ruleEntry_.m_isgroup = false;
                    ruleEntry_.m_chsetEntry.m_rangeEntry = this.parse_range();

                    if (ruleEntry_.m_chsetEntry.m_charset.length > 1024) {
                        throw new parseError("expected less then 1024 per charset", ParseerrorType_t.errMoreThen1024); // Charsets can be splited into different sets and then grouped together.
                    }
                    break;
                }
                case 'd': // shorthand d
                case 'a': // shorthand a
                case 'A': // shorthand A
                case 's': { // shorthand s
                    ruleEntry_.m_chsetEntry.m_charset = generateShorthandSet(ch);
                    ruleEntry_.m_isgroup = false;
                    ruleEntry_.m_chsetEntry.m_rangeEntry = this.parse_range();
                    break;
                }
                default: {
                    throw new parseError("unexpected char", ParseerrorType_t.errUnexpChar, ch);
                }
            }

            return ruleEntry_;
        }

        parse_rules(): ruleEntries_t { // sequence of character sets like: a{1,2}A{1,1}[0-9]{1,1}
            const ruleEntries_: ruleEntries_t = [];

            while (true) {
                const { ch, hasChar } = this.getCharNoThrow();
                if (!hasChar) {
                    return ruleEntries_;
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
                        ruleEntries_.push(ruleEntry);
                        break;
                    }
                    default: {
                        this.ungetChar();
                        return ruleEntries_;
                    }
                }
            }
        }

        parse_start(): void {
            while (true) {

                const { ch, hasChar } = this.getCharIfExistWs();
                if (!hasChar) {
                    return;
                }

                switch (ch) {
                    case '~': { // To avoid the same character be used consecutively (global),
                        this.m_rulesSet.m_avoidConsecutiveChars = true;
                        break;
                    }
                    case '&': { // To avoid the same character in the same position from its previous value (recent one only).
                        this.m_rulesSet.m_checkPrevPasswordCharPosition = true;
                        break;
                    }
                    case '(': // group
                    case '[': // charset
                    case 'd': // shorthand d
                    case 'a': // shorthand a
                    case 'A': // shorthand A
                    case 's': { // shorthand s
                        this.ungetChar();
                        this.m_rulesSet.m_ruleEntries = this.parse_rules();
                        break;
                    }
                    case '<': { // final psw length can be at the begin or at the end of input string.
                        this.ungetChar();
                        this.m_rulesSet.m_pswlenSet = this.parse_finalPswLength();
                        break;
                    }
                    default: {
                        throw new parseError("unexpected char", ParseerrorType_t.errUnexpChar, ch);
                    }
                }
            }
        }

    } //class apparser_t

    export type ParseAdvPolicyResult = {
        rules: rulesSet_t;
        error: parseError;
    };

    export function parse_advpolicy(advpolicy_: string): ParseAdvPolicyResult {

        const rv: { rules: rulesSet_t, error: parseError; } = {
            rules: new rulesSet_t(),
            error: new parseError("", ParseerrorType_t.errNone)
        };

        rv.error.m_errorType = ParseerrorType_t.errNone;

        const apparser = new apparser_t();
        apparser.m_sourceText = advpolicy_;

        try {
            apparser.doparse();
        } catch (error) {
            rv.error = error instanceof parseError ? error : new parseError('unknown', ParseerrorType_t.errUnexpected);
            rv.error.m_errorPos = apparser.m_sourceTextPos;

            console.error(`parse error: ${rv.error.m_what} at ${rv.error.m_errorPos}`);
        }

        if (rv.error.m_errorType == ParseerrorType_t.errNone) {
            rv.rules = apparser.m_rulesSet;
        } else {
            rv.rules.m_ruleEntries = [];
        }

        return rv;
    }


    function parseExtPattern2RulesSet(pattern_: string): ParseAdvPolicyResult
    {
        let rv = parse_advpolicy(pattern_);
        
        // if (rv.error.m_errorType !== ParseerrorType_t.errNone) {
        //    return;
        // }

        //resolveRulesSetBounds(rv_rulesSet_);

        return rv;
    }

    export function parseExtPolicy2RulesSet(policy_: password.policy_t): ParseAdvPolicyResult {
        let pattern_withMinMaxRange = `${policy_.policyExt}<${policy_.minLength}, ${policy_.maxLength}>`;
        return parseExtPattern2RulesSet(pattern_withMinMaxRange);
    }

}//namespace advancedpswpolicy
