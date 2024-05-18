import { is } from "@electron-toolkit/utils";
import { isCharNumber } from "../cpp-utils";

export namespace advancedpswpolicy {
    /////////////////////////////////////////////////////////////////////////

    export type rangeEntry_t = { // Specifies a repetition range like {n,m}. // default is { -1, -1 } 
        // We have four possible cases: missing both; {n}; {n,}; {n,m}.
        // missing both -> {-1,-1}	-> min = 1; max = 1;
        // {n}			-> {n,-1}	-> min = n, max = n;
        // {n,}			-> {n,-2}	-> min = n and max is determined using the final password length and other open ranges in rule.
        // {n,m}		-> {n,m}	-> min = n, max = m;
        m_min: number; // Minimum length of repetition. -1 if value is undefined by rule; -2 if value is ommited by rule.
        m_max: number; // Maximum length of repetition. -1 if value is undefined by rule; -2 if value is ommited by rule.
    };

    type ruleEntries_t = ruleEntry_t[]; // Sequence of rules like: a{1,2}A{1,1}[0-9]{1,1}

    class chsetEntry_t {		// Character set element as a simplest rule like: [a-z]{1,} with repetition.
        m_charset: string = '';	// A set of characters.
        m_rangeEntry: rangeEntry_t = { m_min: -1, m_max: -1 }; // Repetition range.
    };

    class groupEntry_t {		// Group element as a complex rule like: ([a-z]{1,}\A{3}\d{1,3}) with repetition.
        m_ruleEntries: ruleEntry_t[] = [];	// Rules inside this group.
        m_rangeEntry: rangeEntry_t = { m_min: -1, m_max: -1 }; // Repetition range.
        m_mix: boolean = true;				// True if permutation (rearranging) is allowed for this set.
        // TODO: nested level. 0 for the lowest level, i.e. most nested group.
        // TODO: group start in source text.
    };

    class ruleEntry_t { 			// Element that has either chsetEntry_t or groupEntry_t.
        m_isgroup: boolean = false;	// True if group element.
        m_chsetEntry: chsetEntry_t = new chsetEntry_t();	// Character set element.
        m_groupEntry: groupEntry_t = new groupEntry_t();	// Group element.
    };

    class rulesSet_t {
        m_ruleEntries: ruleEntries_t = [];
        m_pswlenSet: rangeEntry_t = { m_min: -1, m_max: -1 }; // Final total length of password.

        m_avoidConsecutiveChars: boolean = false; // Whether to disallow repetition of same character consecutively. 
        m_checkPrevPasswordCharPosition: boolean = false; // Avoid same character in the same position as its recent (predecessor) value.
    };

    const WSHORTHAND_d = "0123456789";
    const WSHORTHAND_a = "abcdefghijklmnopqrstuvwxyz";
    const WSHORTHAND_A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const WSHORTHAND_s = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // 21-2F, 3A-40, 5B-60, 7B-7E

    /////////////////////////////////////////////////////////////////////////

    enum ParseerrorType_t {
        errNone,					// No errors as a default value.
        errUnexpected,				// Any unexpected error that is thrown as a general exeption.
        errUnexpShorthand,			// "unexpected shorthand"
        errUnexpChar,				// "unexpected char" character that is defined in m_expected member.
        errExpChar,					// "expected" character that is defined in m_expected member.
        errExpCharALessB,			// "expected character in set as a <= b"
        errExpMoreText,				// "no more text"
        errExpNum,					// "expected number"
        errInvRange,				// "invalid range", i.e. min > max
        errExpDigit,				// "expected digit"
        errExp4Digits,				// "expected 4 hex digits"
        errUnexpChSetClose,			// "unexpected '[' before ']'", i.e. close without open.
        errChSetEmpty,				// "unexpected empty charset"
        errExpLowBoundCh,			// "expected lower boundary char before '-'"
        errUnexpDoubleSet,			// "unexpected double '--'". Use escape character i.e. "\-"
        errMoreThen1024,			// "expected less then 1024 per charset"
        errLastError,				// A highest number of error.
    };

    class parseError {
        m_what: string = '';		// Error message.
        m_errorType: ParseerrorType_t = ParseerrorType_t.errNone;
        m_errorPos: number = 0;		// Position in source text where error occured.
        expected: string = '';		// Expected character.

        constructor(what: string, errorType: ParseerrorType_t, expected: string = '') {
            this.m_what = what;
            this.m_errorType = errorType;
            this.expected = expected;
        }
    }

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

    // /*static*/ function generateCharRange(A_: string, B_: string, rv_: string): string {
    //     // 0. Generate, make sure that characters are unique in set, and sort.

    //     if (A_ > B_) {
    //         throw new parseError("expected set n <= m", ParseerrorType_t.errExpCharALessB);
    //     }

    //     for (wchar_t a = A_; a <= B_; a++)
    //     {
    //         bool isNew = rv_.find_first_of(a) == wstring_t:: npos;
    //         if (!isNew) {
    //             continue;
    //         }

    //         rv_ += a;
    //     }

    //     std:: sort(rv_.begin(), rv_.end(), std:: less<wchar_t>()); // i.e. "abc"
    // } //generateCharRange()

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
            /** / not yet
                        this.parse_start();
            /**/
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

        /** / not yet
                void parse_finalPswLength(__inout rangeEntry_t& rangeEntry_) throw(...) // Get final length of password: <2,2> or <2>.
                {
                    getRangeEntryWs('<', '>', rangeEntry_);
                	
                    if (rangeEntry_.m_max == -1)
                        rangeEntry_.m_max = rangeEntry_.m_min;
        
                }
        
                void parse_range(__inout rangeEntry_t& rangeEntry_) throw(...) // Allowed notation for ranges: {2,4} or {2,2} or {2} or {2,}
                {
                    getRangeEntryWs('{', '}', rangeEntry_);
        
                }
        /**/
        /** / not yet
                void getCharOfCharset(__out wchar_t& rv_char_) throw(...) // single character like: a b \u1234 \U1234 \u+1234 \U+1234 \u-1234 \U-1234
                {
                    rv_char_ = 0;
                    wchar_t ch = 0;
        
                    ch = getChar();
                    if (ch != '\\')
                    {
                        rv_char_ = ch; // Not an escape then return as it is.
                        return;
                    }
        
                    ch = getChar();
                    if (ch != 'u' && ch != 'U')
                    {
                        rv_char_ = ch; // Not an unicode then return as it is.
                        return;
                    }
        
                    ch = getChar();
                    if (ch != '+' && ch != '-')
                    {
                        ungetChar(); // Don't eat if it is not an optional '+' or '-'.
                    }
        
                    // Get 4 hexidecimal digits.
        
                    wstring_t buffer;
                    int i = 0;
                    while (i++ < 4)
                    {
                        ch = getChar();
        
                        bool gotDigit = iswdigit(ch) != 0 || (ch >= 'A' && ch <= 'F') || (ch >= 'a' && ch <= 'f');
                        if (!gotDigit)
                            throw new parseError("expected digit", ParseerrorType_t.errExpDigit);
        
                        buffer += ch;
                    }//while
        
                    // Convert to wchar_t
                	
                    int number = -1;
                    convert_hex(buffer, -1, number); // TODO: Check that we can handle lower and upper case.
        
                    if (number > 0xFFFF || number < 0)
                        throw new parseError("expected 4 hex digits", ParseerrorType_t.errExp4Digits);
        
                    rv_char_ = (wchar_t)number;
        
                }
        /**/
        /** / not yet
                void parse_charset(__out wstring_t& rv_charset_) throw(...) // single character sets (don't skip whitespace) like: [a-z02 A-M-ZZY02-1]
                {
                    rv_charset_.clear();
        
                    wchar_t ch = getChar();
                    bool isSquareBrStart = ch == '[';
                    if (ch != '[')
                    {
                        ungetChar(); // Eat only '['
                    }
        
                    while (true)
                    {
                        ch = getChar();
                        if (ch == ']') // Check if it is the end of character set and we started with '['.
                        {
                            if (!isSquareBrStart)
                                throw new parseError("unexpected '[' before ']'", ParseerrorType_t.errUnexpChSetClose); // expected charset beging before closing.
                            if (rv_charset_.empty())
                                throw new parseError("unexpected empty charset", ParseerrorType_t.errChSetEmpty);
                            return;
                        }
        
                        bool isRange = false;
        
                        if (ch == '-') // If it is a range of characters then eat this character.
                        {
                            if (rv_charset_.empty())
                                throw new parseError("expected lower boundary char before '-'", ParseerrorType_t.errExpLowBoundCh);
        
                            ch = getChar(); // Check that we don't have '[--1]'. '-' should be escaped.
                            if (ch == '-')
                                throw new parseError("unexpected double '--'", ParseerrorType_t.errUnexpDoubleSet);
                            ungetChar();
        
                            isRange = true;
                        }
                        else
                        {
                            ungetChar();
                        }
        
                        wchar_t chCharset = 0;
                        getCharOfCharset(chCharset);
        
                        if (isRange)
                        {
                            wchar_t chFirst = rv_charset_[rv_charset_.length()-1]; // Cut the last char and use it as a first of range.
                            rv_charset_.erase(rv_charset_.length()-1);
                        	
                            generateCharRange(chFirst, chCharset, rv_charset_);
                            isRange = false;
                            continue;
                        }
        
                        rv_charset_ += chCharset;
                    }//while (true)
        
                }
        /**/
        /** / not yet
                void parse_group(__inout ruleEntry_t& ruleEntry_) throw(...) // '(' Rules ')' '.' // Range is handled outside.
                {
                    wchar_t ch = getChar();
                    if (ch != '(')
                    {
                        throw new parseError("expected '('", ParseerrorType_t.errExpChar, '('); // This is just internal error and should be fixed in logic. //ungetChar(); // Eat only '('
                    }
        
                    parse_rules(ruleEntry_.m_groupEntry.m_ruleEntries);
        
                    ch = getChar();
                    if (ch != ')')
                    {
                        throw new parseError("expected ')'", ParseerrorType_t.errExpChar, ')'); // Expected end of group.
                    }
        
                    ch = 0;
                    if (getCharIfExistWs(ch))
                    {
                        if (ch == '.')
                        {
                            ruleEntry_.m_groupEntry.m_mix = false;
                        }
                        else
                        {
                            ungetChar();
                        }
                    }
        
                }
        /**/
        /** / not yet
                void parse_rule(__inout ruleEntry_t& ruleEntry_) throw(...) // single rule like: 'a{1,2}' 'A{1,1}' '[0-9]{1,1}' '(a{1,2}).{1,2}'
                {
                    wchar_t ch = 0;
                    if (!getCharIfExistWs(ch))
                    {
                        return;
                    }
        
                    switch (ch)
                    {
                        case '(': // group
                            {
                                ungetChar();
                                ruleEntry_.m_isgroup = true;
                                parse_group(ruleEntry_);
                                parse_range(ruleEntry_.m_groupEntry.m_rangeEntry);
                            }
                            break;
                        case '[': // charset
                            {
                                ungetChar();
                                ruleEntry_.m_isgroup = false;
                                parse_charset(ruleEntry_.m_chsetEntry.m_charset);
                                parse_range(ruleEntry_.m_chsetEntry.m_rangeEntry);
        
                                if (ruleEntry_.m_chsetEntry.m_charset.size() > 1024)
                                    throw new parseError("expected less then 1024 per charset", ParseerrorType_t.errMoreThen1024); // Charsets can be splited into different sets and then grouped together.
                            }
                            break;
                        case 'd': // shorthand d
                        case 'a': // shorthand a
                        case 'A': // shorthand A
                        case 's': // shorthand s
                            {
                                ruleEntry_.m_isgroup = false;
                                generateShorthandSet(ch, ruleEntry_.m_chsetEntry.m_charset);
                                parse_range(ruleEntry_.m_chsetEntry.m_rangeEntry);
                            }
                            break;
                        default:
                            throw new parseError("unexpected char", ParseerrorType_t.errUnexpChar, ch);
                    }//switch
        
                }
        /**/
        /** / not yet
                void parse_rules(__inout ruleEntries_t& ruleEntries_) throw(...) // sequence of character sets like: a{1,2}A{1,1}[0-9]{1,1}
                {
                    while (true)
                    {
                        //const { ch, hasChar } = this.getCharNoThrow();
                        wchar_t ch = 0;
                        bool gotChar = getCharNoThrow(ch);
                        if (!gotChar)
                        {
                            return;
                        }
        
                        switch (ch)
                        {
                            case '(': // group
                            case 'd': // shorthand d
                            case 'a': // shorthand a
                            case 'A': // shorthand A
                            case 's': // shorthand s
                            case '[': // charset
                                {
                                    ungetChar();
                                    ruleEntry_t ruleEntry;
                                    parse_rule(ruleEntry);
                                    ruleEntries_.push_back(ruleEntry);
                                }
                                break;
                            default:
                                {
                                    ungetChar();
                                    return;
                                }
                        }//switch
                    }//while (true)
        
                }
        /**/
        /** / not yet
                void parse_start() throw(...)
                {
                    while (true)
                    {
                        wchar_t ch = 0;
                        if (!getCharIfExistWs(ch))
                        {
                            return;
                        }
        
                        switch (ch)
                        {
                            case '~': // To avoid the same character be used consecutively (global),
                                {
                                    m_rulesSet.m_avoidConsecutiveChars = true;
                                }
                            break;
                            case '&': // To avoid the same character in the same position from its previous value (recent one only).
                                {
                                    m_rulesSet.m_checkPrevPasswordCharPosition = true;
                                }
                            break;
                            case '(': // group
                            case '[': // charset
                            case 'd': // shorthand d
                            case 'a': // shorthand a
                            case 'A': // shorthand A
                            case 's': // shorthand s
                                {
                                    ungetChar();
                                    parse_rules(m_rulesSet.m_ruleEntries);
                                }
                            break;
                            case '<': // final psw length can be at the begin or at the end of input string.
                                {
                                    ungetChar();
                                    parse_finalPswLength(m_rulesSet.m_pswlenSet);
                                }
                            break;
                            default:
                                throw new parseError("unexpected char", ParseerrorType_t.errUnexpChar, ch);
                        }//switch
                    }//while (true)
        
                }
        /**/
    }; //class apparser_t

    /** / not yet
        inline void parse_advpolicy(__in const string_t& advpolicy_, __inout rulesSet_t& rv_rulesSet_, __out parseError& rv_parseError_) throw()
        {
            rv_parseError_.m_errorType = ParseerrorType_t.errNone;
    
            apparser_t apparser;
            apparser.m_sourceText = utf8(advpolicy_);
            try
            {
                apparser.doparse();
            }
            catch(parseError& er_)
            {
                rv_parseError_ = er_;
                rv_parseError_.m_errorPos = apparser.m_sourceTextPos;
    
                atltrace::error(wformat(L"parse error: %hs", er_.what()));
            }
            catch(...)
            {
                rv_parseError_.m_errorType = ParseerrorType_t.errUnexpected;
                rv_parseError_.m_errorPos = apparser.m_sourceTextPos;
    
                atltrace::error("parse error [all]");
            }
    
            if (rv_parseError_.m_errorType == ParseerrorType_t.errNone)
                rv_rulesSet_ = apparser.m_rulesSet; // TODO: use ref instead of copy
            else
                rv_rulesSet_.m_ruleEntries.clear();
    
        } //parse_advpolicy()
    /**/

}//namespace advancedpswpolicy
