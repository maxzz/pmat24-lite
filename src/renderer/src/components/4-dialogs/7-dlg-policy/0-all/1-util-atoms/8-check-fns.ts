export function checkMinMax({ min, max }: { min: number; max: number; }): string | undefined {
    if (isNaN(min)) {
        return 'Min password length is not a number';
    }

    if (isNaN(max)) {
        return 'Max password length is not a number';
    }

    if (min < 1) {
        return 'Min password length cannot be less than 1';
    }

    if (max < min) {
        return 'Max password length is less than min password length';
    }
}

export function checkBoundsRange({ min, max, totalMin, totalMax }: { min: number; max: number; totalMin: number; totalMax: number; }): string | undefined {
    // Check if custom rule generates lenght can be inside defined total password length and show error if not
    if (min > totalMin) {
        return `The custom rule can generate ${totalMin} characters, but minimum required is ${min}`;
    }

    if (max < totalMax) {
        return `The custom rule can generate ${totalMax} characters, but maximun required is ${max}`;
    }
}
