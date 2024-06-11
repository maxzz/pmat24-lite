export function validateNonEmpty(value: string): string {
    return !!value ? '' : 'Value cannot be empty.';
}

export function validateManifestName(value: string): string {
    return !!value ? '' : 'The manifest name cannot be empty.';
}

export function validateMinLen(value: string): string {
    const num = parseInt(value, 10);
    if (isNaN(num)) {
        return 'Value must be a number.';
    }
    return num < 1 ? 'Min password length must be more than 1' : '';
}

export function validateMaxLen(value: string): string {
    const num = parseInt(value, 10);
    if (isNaN(num)) {
        return 'Value must be a number.';
    }
    return num < 1 ? 'Max password length must be more than 1' : '';
}
//TODO: when isCustom assume initial values are correct
//TODO: length may be missing from custom rule
