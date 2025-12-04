export function strFindFirstOf(str: string, ch: Set<string>): number {
    for (let i = 0; i < str.length; ++i) {
        if (ch.has(str[i])) {
            return i;
        }
    }
    return -1;
}

export function strFindFirstNotOf(str: string, ch: Set<string>): number {
    for (let i = 0; i < str.length; ++i) {
        if (!ch.has(str[i])) {
            return i;
        }
    }
    return -1;
}

export function isCharNumber(c: string): boolean {
    return c >= '0' && c <= '9';
}

export function isCharHexNumber(c: string): boolean {
    return isCharNumber(c) || (c >= 'A' && c <= 'F') || (c >= 'a' && c <= 'f');
}
