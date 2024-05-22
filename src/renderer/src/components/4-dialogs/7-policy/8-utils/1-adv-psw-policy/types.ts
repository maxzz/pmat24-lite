/**
 * Specifies a repetition range like {n,m}. // default is { -1, -1 }
 * 
 * min and max - minimum and maximum length of repetition
 * 
 * We have four possible cases: missing both; {n}; {n,}; {n,m}.
 * 
 * * missing both -> {-1,-1} -> min = 1; max = 1;
 * * {n}          -> {n,-1}  -> min = n, max = n;
 * * {n,}         -> {n,-2}  -> min = n and max is determined using the final password length and other open ranges in rule.
 * * {n,m}        -> {n,m}   -> min = n, max = m;
 * 
 * min and max are min and max length of repetition and also can be:
 * * -1 if value is undefined by rule;
 * * -2 if value is ommited by rule.
 */
export type RangeEntry = {
    min: number;
    max: number;
};

export type RuleEntries = RuleEntry[];                  // Sequence of rules like: a{1,2}A{1,1}[0-9]{1,1}

export class ChSetEntry {                               // Character set element as a simplest rule like: [a-z]{1,} with repetition.
    m_charset: string = '';                             // A set of characters.
    m_rangeEntry: RangeEntry = { min: -1, max: -1 };    // Repetition range.
};

class GroupEntry {                                      // Group element as a complex rule like: ([a-z]{1,}\A{3}\d{1,3}) with repetition.
    m_ruleEntries: RuleEntry[] = [];                    // Rules inside this group.
    m_rangeEntry: RangeEntry = { min: -1, max: -1 };    // Repetition range.
    m_mix: boolean = true;                              // True if permutation (rearranging) is allowed for this set.
    // TODO: nested level. 0 for the lowest level, i.e. most nested group.
    // TODO: group start in source text.
};

export class RuleEntry {                                // Element that has either chsetEntry_t or groupEntry_t.
    m_isgroup: boolean = false;                         // True if group element.
    m_chsetEntry: ChSetEntry = new ChSetEntry();        // Character set element.
    m_groupEntry: GroupEntry = new GroupEntry();        // Group element.
};

export class RulesSet {
    m_ruleEntries: RuleEntries = [];
    m_pswlenSet: RangeEntry = { min: -1, max: -1 };     // Final total length of password.

    m_avoidConsecutiveChars: boolean = false;           // Whether to disallow repetition of same character consecutively. 
    m_checkPrevPasswordCharPosition: boolean = false;   // Avoid same character in the same position as its recent (predecessor) value.
};

// Erorr types.

export enum ParseErrorType {
    errNone,                                            // No errors as a default value.
    errUnexpected,                                      // Any unexpected error that is thrown as a general exeption.
    errUnexpShorthand,                                  // "unexpected shorthand"
    errUnexpChar,                                       // "unexpected char" character that is defined in m_expected member.
    errExpChar,                                         // "expected" character that is defined in m_expected member.
    errExpCharALessB,                                   // "expected character in set as a <= b"
    errExpMoreText,                                     // "no more text"
    errExpNum,                                          // "expected number"
    errInvRange,                                        // "invalid range", i.e. min > max
    errExpDigit,                                        // "expected digit"
    errExp4Digits,                                      // "expected 4 hex digits"
    errUnexpChSetClose,                                 // "unexpected '[' before ']'", i.e. close without open.
    errChSetEmpty,                                      // "unexpected empty charset"
    errExpLowBoundCh,                                   // "expected lower boundary char before '-'"
    errUnexpDoubleSet,                                  // "unexpected double '--'". Use escape character i.e. "\-"
    errMoreThen1024,                                    // "expected less then 1024 per charset"
    errLastError,                                       // A highest number of error.
};

export class ParseError {
    type: ParseErrorType = ParseErrorType.errNone;
    pos: number = 0;                                    // Position in source text where error occured.
    what: string = '';                                  // Error message.
    expected: string = '';                              // Expected character.

    constructor(what: string, errorType: ParseErrorType, expected: string = '') {
        this.what = what;
        this.type = errorType;
        this.expected = expected;
    }
}
