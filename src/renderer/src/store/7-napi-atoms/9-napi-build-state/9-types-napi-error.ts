// Client side version of NapiCallError see also server version in ./src/shell/xternal-to-renderer/7-napi-calls/9-types-napi-error.ts

export type NapiCallError =
    | ''                    // no error
    | 'unknown'             // Undefined '>>>', i.e. un-typed; happens during error split in splitTypedError()
    | 'unknown-error'       // Unknown error; see extra param for details; as usual from catch
    | 'build-error'         // Error during manifest build
    | 'build-wo-mani'       // Build done without manifest
    | 'canceled-by-user'    // Canceled by user
    | 'too-many-controls'   // Too many controls (more then ${mainStore.maxControls})
    ;

/**
 * First part after '>>>' is error type, second part after ':::' is optional extra info.
 */
export function makeTypedError(error: NapiCallError, extra?: string): string {
    if (extra) {
        return `>>>${error}:::${extra}`;
    }
    return `>>>${error}`;
}

export type TypedError = {
    typed: NapiCallError;
    extra: string | undefined;
};

export function splitTypedError(errorStr: string): TypedError {
    const typed = errorStr.split('>>>').at(-1) as NapiCallError;

    if (!typed) {
        return {
            typed: 'unknown',
            extra: errorStr,
        };
    }

    const parts = typed.split(':::');
    return {
        typed: parts[0] as NapiCallError,
        extra: parts[1],
    };
}

export function typedErrorToString(typedError: TypedError): string {
    return `typed: ${typedError.typed}${typedError.extra ? `, extra: ${typedError.extra}` : ''}`;
}
