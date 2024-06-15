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
}

export class ParseError {
    type: ParseErrorType = ParseErrorType.none;
    pos: number = 0;                                    // Position in source text where error occured.
    what: string = '';                                  // Error message.
    expected: string = '';                              // Expected character.

    constructor(what: string, errorType: ParseErrorType, pos: number, expected: string = '') {
        this.what = what;
        this.type = errorType;
        this.pos = pos;
        this.expected = expected;
    }
}

export function parserErrorToString(e: unknown): string {
    const msg =
        e instanceof ParseError
            ? `${e.what} at position ${e.pos}`
            : e instanceof Error
                ? e.message
                : `${e}`;
    return msg;
}
