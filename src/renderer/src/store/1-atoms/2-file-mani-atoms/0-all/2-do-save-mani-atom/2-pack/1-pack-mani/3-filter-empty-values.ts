/**
 * Filter empty values from the object at the top level.
 * If the object is empty, return undefined.
 * 
 * TODO: This will break order of fields
 */
export function filterOneLevelEmptyValues<T extends Record<string, any>>(obj: T): T | undefined {
    const entries = Object
        .entries(obj)
        .filter(([key, value]) => !!value);

    return entries.length ? Object.fromEntries(entries) as T : undefined;
}
