export function filterEmptyValues<T extends Record<string, any>>(obj: T): T | undefined {
    const entries = Object
        .entries(obj)
        .filter(([key, value]) => !!value);
    return entries.length ? Object.fromEntries(entries) as T : undefined;
}
