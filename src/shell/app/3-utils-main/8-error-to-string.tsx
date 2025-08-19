/**
 * Regular error to string
 */
export function errorToString(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return `${error}`;
}

/**
 * The same as errorFromSubstring but return the last substring.
 */
export function errorSubstring(error: unknown): { message: string; submessage: string | undefined; }  {
    const message = errorToString(error);
    return {
        message,
        submessage: message.split('>>>').at(-1)
    };
}

/**
 * Get error message
 * from "'get-saw-content' Error invoking remote method 'invoke-main': >>>Too many controls"
 * as 'Too many controls'
 * or return error message as is.
 */
export function errorFromSubstring(error: unknown): string {
    const { message, submessage } = errorSubstring(error);
    return submessage || message;
}

// Trace with stack

export function showStackElectron(...rest: any[]) {
    console.groupCollapsed(...rest);
    console.trace();
    console.groupEnd();
}

// Check node.js error

export function isErrorWithCode(err: unknown): err is Error & { code: unknown; } {
    return err instanceof Error && 'code' in err;
}
