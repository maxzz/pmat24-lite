export function removeImm<T>(data: T[], index: number): T[] { // remove() immutable version
    return data.filter((_item, idx) => idx !== index);
}

export function swap<T>(data: T[], indexA: number, indexB: number): void {
    data[indexA] = [data[indexB], (data[indexB] = data[indexA])][0];
}

export function swapImmutable<T>(data: T[], indexA: number, indexB: number): T[] {
    const arr = [...data];
    arr[indexA] = [arr[indexB], (arr[indexB] = arr[indexA])][0];
    return arr;
}
