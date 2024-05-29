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
export type Range = {                                   // array of rules is a sequence like: a{1,2}A{1,1}[0-9]{1,1}
    min: number;
    max: number;
};

export class ChSet {                                    // Character set element as a simplest rule like: [a-z]{1,} with repetition.
    chars: string = '';                                 // A set of characters.
    range: Range = { min: -1, max: -1 };                // Repetition range.
};

class Group {                                           // Group element as a complex rule like: ([a-z]{1,}\A{3}\d{1,3}) with repetition.
    rules: Rule[] = [];                                 // Rules inside this group.
    range: Range = { min: -1, max: -1 };                // Repetition range.
    mix: boolean = true;                                // True if permutation (rearranging) is allowed for this set.
    // TODO: nested level. 0 for the lowest level, i.e. most nested group.
    // TODO: group start in source text.
};

export class Rule {                                     // Element that has either chsetEntry_t or groupEntry_t.
    chSet: ChSet = new ChSet();                         // Character set element.
    group: Group = new Group();                         // Group element.
    isGroup: boolean = false;                           // True if group element.
};

export class RulesExtra {
    rules: Rule[] = [];
    pswLenRange: Range = { min: -1, max: -1 };          // Final total length of password.

    avoidConsecutiveChars: boolean = false;             // Whether to disallow repetition of same character consecutively. 
    checkPrevPswCharPosition: boolean = false;          // Avoid same character in the same position as its recent (predecessor) value.
};

// Erorr types.

export enum ParseErrorType {
    none,                                               // No errors as a default value.
    unexpected,                                         // Any unexpected error that is thrown as a general exeption.
    unexpShorthand,                                     // "unexpected shorthand"
    unexpChar,                                          // "unexpected char" character that is defined in m_expected member.
    expChar,                                            // "expected" character that is defined in m_expected member.
    expCharALessB,                                      // "expected character in set as a <= b"
    expMoreText,                                        // "no more text"
    expNum,                                             // "expected number"
    invRange,                                           // "invalid range", i.e. min > max
    expDigit,                                           // "expected digit"
    exp4Digits,                                         // "expected 4 hex digits"
    unexpChSetClose,                                    // "unexpected '[' before ']'", i.e. close without open.
    chSetEmpty,                                         // "unexpected empty charset"
    expLowBoundCh,                                      // "expected lower boundary char before '-'"
    unexpDoubleSet,                                     // "unexpected double '--'". Use escape character i.e. "\-"
    moreThen1024,                                       // "expected less then 1024 per charset"
    lastError,                                          // A highest number of error.
};

export class ParseError {
    type: ParseErrorType = ParseErrorType.none;
    pos: number = 0;                                    // Position in source text where error occured.
    what: string = '';                                  // Error message.
    expected: string = '';                              // Expected character.

    constructor(what: string, errorType: ParseErrorType, expected: string = '') {
        this.what = what;
        this.type = errorType;
        this.expected = expected;
    }
}
