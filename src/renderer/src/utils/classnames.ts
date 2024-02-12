export function cx(...classes: Array<string | Record<string, boolean>>): string {
    return classes.map((cls) => (
        typeof cls === 'string'
            ? cls
            : Object.keys(cls).filter((subKey: string) => cls[subKey]).join(' ')),
    ).join(' ');
}

export function classNames(...classes: (string | undefined | false | null | 0)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function tw(s: string): string { // added to help tailwind intellisense
    return s;
}