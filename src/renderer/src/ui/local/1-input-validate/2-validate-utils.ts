export function validateNonEmpty(value: string): string {
    return !!value ? '' : 'Value cannot be empty.';
}

export function validateManifestName(value: string): string {
    return !!value ? '' : 'The manifest name cannot be empty.';
}
