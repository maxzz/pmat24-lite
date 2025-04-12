/**
 * Discard all keys value to undefined at the top level
 */
export function discardValues(obj: {} | undefined | null) {
    if (!obj) {
        return;
    }
    Object.keys(obj).forEach(
        (key) => {
            obj[key] = undefined;
        }
    );
}

/**
 * Discard all keys value to undefined deeply. They become undefined or null.
 */
export function discardValuesDeep(obj: {} | undefined | null) {
    if (!obj) {
        return;
    }
    for (const key in obj) {
        if (!!obj && typeof obj[key] === 'object') {
            discardValuesDeep(obj[key]);
        } else {
            obj[key] = undefined;
        }
    }
}
