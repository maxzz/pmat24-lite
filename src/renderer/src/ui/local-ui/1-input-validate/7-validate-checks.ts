export function validateNonEmpty(value: string): string {
    return !!value ? '' : 'Value cannot be empty.';
}

export function validateNonEmptyWithMessage(message: string): (value: string) => string {
    return (value: string) => !!value ? '' : message;
}

export function validateManifestName(value: string): string {
    return !!value ? '' : 'The managed login name must not be empty.';
}

export function validateNumber(value: string): string {
    const num = parseInt(value);
    if (isNaN(num)) {
        return 'Value must be a number.';
    }
    return '';
}

export function validateNumberMinMax(min: number, max: number, name?: string): (value: string) => string {
    name = name || 'Value';
    return (value: string) => {
        const num = +value;
        if (isNaN(num)) {
            return `${name} must be a number.`;
        }
        return num < min || num > max ? `${name} must be between ${min} and ${max}.` : '';
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
