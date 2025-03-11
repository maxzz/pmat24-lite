export type NapiCallError =
    | 'unknown-error'       // Unknown error; see extra param for details; as usual from catch
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

export function errorToString(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return `${error}`;
}
