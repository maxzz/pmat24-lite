/**
 * Get from error message
 * "'get-saw-content' Error invoking remote method 'invoke-main': >>>Too many controls"
 * string 'Too many controls'.
 */
export function getSubErrorMessage(error: unknown): string {
    const msg = error instanceof Error ? error.message : `${error}`;
    return msg.split('>>>').at(-1) || msg;
}
