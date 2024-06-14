import { getRandomCryptoValues } from "./2-random-values";

export function genPswPartByChars(buildFromChars: string, excludeChars: string, pswLength: number): string {
    if (pswLength <= 0) {
        throw new Error("inv.arg.length");
    }

    let combinedSubsetIn = new Set(buildFromChars);
    for (const ch of excludeChars) {
        combinedSubsetIn.delete(ch);
    }

    let combinedSubset = Array.from(combinedSubsetIn).join('');
    if (!combinedSubset) {
        throw new Error("empty.comb.set");
    }

    const randomArr = getRandomCryptoValues(pswLength);

    const newPswPart = randomArr.map((v) => combinedSubset[v % combinedSubset.length]).join('');
    return newPswPart;
}
