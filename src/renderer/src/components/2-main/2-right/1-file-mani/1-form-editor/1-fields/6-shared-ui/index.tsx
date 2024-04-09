export const inputRingClasses = "\
focus-within:ring-1 \
focus-within:ring-offset-1 \
ring-mani-ring \
focus-within:ring-mani-ring-activated \
focus-within:ring-offset-mani-background";

export function isKeyToClearDefault(key: string) {
    return key === 'Backspace' || /^[a-z0-9]$/i.test(key);
}
