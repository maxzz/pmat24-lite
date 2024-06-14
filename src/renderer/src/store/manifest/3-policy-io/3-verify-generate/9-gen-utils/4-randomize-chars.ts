import { getRandomCryptoValues } from "./2-random-values";

export function randomizeCharsInString(psw: string): string {
    if (!psw) {
        return '';
    }

    const randomArr = getRandomCryptoValues(psw.length);

    const arr = psw.split('');
    let i = 0;
    arr.forEach(
        (current, idx) => {
            const newIdx = randomArr[i++] % psw.length;

            const temp = arr[newIdx];
            arr[newIdx] = current;
            arr[idx] = temp;
        }
    );

    const rv = arr.join('');
    return rv;
}
