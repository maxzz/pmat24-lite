export function round2(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function roundInt(num: number) {
    return Math.round(num);
}
