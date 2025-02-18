export function withDigits(value: number, digits: number = 2): string {
    return value.toFixed(Math.max(Math.min(digits, 20), 0));
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export const toNumberWDefault1 = (string: string) => { //mostly for plural and pluralWord
    let n = parseInt(string);
    if (Number.isNaN(n)) {
        n = 1;
    }
    return n;
};

export function plural(n: number): string {
    return n === 1 ? '' : 's';
}

export function pluralWord(n: number, word: string) {
    return `${word}${n === 1 ? '' : 's'}`;
}

export function randomIntExclusive(min: number, max: number): number { // The maximum is exclusive and the minimum is inclusive
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function randomIntInclusive(min: number, max: number): number { // The maximum is inclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
