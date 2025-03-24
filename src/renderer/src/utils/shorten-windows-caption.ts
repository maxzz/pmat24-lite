/**
 * Shorten caption by removing browser name and flavor like:
 * "Login - Tailwind UI and 2 more pages - Personal - Microsoft​ Edge"
 * to 'Login - Tailwind UI and 2 more pages'
 * Note on Microsoft Edge: There is hidden unicode character 'E2 80 8B' ("ZERO-WIDTH SPACE") afer 't' : " - Microsoft​ Edge'"
 * @param caption 
 * @returns 
 */
export function shortenWindowCaption(caption: string | undefined) {
    let rv = caption || '';
    if (rv) {
        rv = rv.replace(/ - Google Chrome$/g, '');
        rv = rv.replace(/ - Microsoft.? Edge$/g, '');
        rv = rv.replace(/ - Personal$/g, '');
        // rv = rv.length > 30 ? `${rv.substring(0, 30)}...` : rv;
    }
    return rv;
}
