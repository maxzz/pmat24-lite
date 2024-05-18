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

export function isCharNumber(c) {
    return c >= '0' && c <= '9';
}
