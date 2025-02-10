export function prependUrlPath(url: string): string {
    return `${location.pathname}/${url}`.replaceAll('//', '/'); // "/1.json" (localhost) vs. "/pmat24-lite/1.json" (GitHub)
}
