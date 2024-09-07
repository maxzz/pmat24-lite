export function validateNonEmpty(value: string): string {
    return !!value ? '' : 'Value cannot be empty.';
}

export function validateManifestName(value: string): string {
    return !!value ? '' : 'The manifest name cannot be empty.';
}

export function validateNumber(value: string): string {
    const num = +value;
    if (isNaN(num)) {
        return 'Value must be a number.';
    }
    return '';
}

export function validateNumberMinMax(min: number, max: number): (value: string) => string {
    return (value: string) => {
        const num = +value;
        if (isNaN(num)) {
            return 'Value must be a number.';
        }
        return num < min || num > max ? `Value must be between ${min} and ${max}.` : '';
    };
}

export function validateMinLen(value: string): string {
    const num = +value;
    if (isNaN(num)) {
        return 'Value must be a number.';
    }
    return num < 1 ? 'Min password length must be more than 1' : '';
}

export function validateMaxLen(value: string): string {
    const num = +value;
    if (isNaN(num)) {
        return 'Value must be a number.';
    }
    return num < 1 ? 'Max password length must be more than 1' : '';
}
