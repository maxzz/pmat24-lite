// Client side version of NapiCallError see also server version in ./src/shell/xternal-to-renderer/7-napi-calls/9-types-napi-error.ts

import { type BrowserExtErrors } from "@shared/ipc-types";

export type NapiCallError =
    | ''                    // no error
    | 'unknown'             // Undefined '>>>', i.e. un-typed; happens during error split in splitTypedError()
    | 'unknown-error'       // Unknown error; see extra param for details; as usual from catch
    | 'build-error'         // Error during manifest build
    | 'build-wo-mani'       // Build done without manifest
    | 'canceled-by-user'    // Canceled by user
    | 'too-many-controls'   // Too many controls (more then ${mainStore.maxControls})
    ;

type MakeTypedErrorParams =
    | { error: NapiCallError; extra?: string; }
    | { sub: BrowserExtErrors; }
    ;

/**
 * First part after '>>>' is error type, second part after ':::' is optional extra info.
 */
export function makeTypedError(params: MakeTypedErrorParams): string {
    if ('sub' in params) {
        const error: NapiCallError = 'build-error';
        return `>>>${error}:::${params.sub}:::`; // ::: at the end to distinguish from call with extra
    }
    if (params.extra) {
        return `>>>${params.error}:::${params.extra}`;
    }
    return `>>>${params.error}`;
}

export type TypedError = {
    typed: NapiCallError;
    extra: string | undefined;
    sub?: BrowserExtErrors | ''; // error ruturned from ManifestForWindowCreatorResult as 'incompatiblePM' from '>>>build-error:::incompatiblePM'
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
    if (parts.length === 2) {
        return {
            typed: parts[0] as NapiCallError,
            extra: parts[1],
            sub: '',
        };
    } else {
        return {
            typed: parts[0] as NapiCallError,
            extra: '',
            sub: parts[1] as BrowserExtErrors,
        };
    }
}

export function typedErrorToString(typedError: TypedError): string {
    return `typed: ${typedError.typed}${typedError.extra ? `, extra: ${typedError.extra}` : ''}`;
}
