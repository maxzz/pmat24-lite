import { ChSetExtra } from "../9-types";

function sortAscendingByCharSetLength(a: ChSetExtra, b: ChSetExtra): number {
    if (a.chSet.chars.length === b.chSet.chars.length) {
        return 0;
    }
    const isLowerCharSetLength = a.chSet.chars.length < b.chSet.chars.length;
    return isLowerCharSetLength ? -1 : 1;
}

export function spreadLenForUndef(toGenerate: ChSetExtra[], pswLenGenerated: number, targetMin: number, targetMax: number): number {
    // Sort ruleEntries whose max is undefined in ascending order of their character set length.
    toGenerate.sort(sortAscendingByCharSetLength);

    let entriesCount = toGenerate.length;

    toGenerate.forEach(
        (chSetExtra, idx) => {
            const lenForThisUndef = Math.floor((targetMax - pswLenGenerated) / (entriesCount > 0 ? entriesCount : 1));

            if (lenForThisUndef <= 0) { // No more extra characters available so set minimum length
                chSetExtra.max = chSetExtra.min;
            } else {
                const isLastEntry = idx === toGenerate.length - 1;
                if (isLastEntry) {
                    let moreLengthToGenerate = 0; // Minimum more characters to satisfy the minimum length requirement.


                    // We have rule entries for whom password has to be generated.
                    if (pswLenGenerated < targetMin) {
                        moreLengthToGenerate = targetMin - pswLenGenerated;

                        const minimumLenToSatisfyRange = Math.max(moreLengthToGenerate, chSetExtra.min);
                        chSetExtra.min = Math.min(minimumLenToSatisfyRange, chSetExtra.chSet.chars.length);
                    }
                }

                chSetExtra.max = Math.max(chSetExtra.min, Math.min(lenForThisUndef, chSetExtra.chSet.chars.length));

                if (isLastEntry && chSetExtra.max > targetMax - pswLenGenerated) {
                    chSetExtra.max = targetMax - pswLenGenerated;
                }
            }

            if (chSetExtra.checkWasLenGenerated()) {
                pswLenGenerated += chSetExtra.generatedLen;
                entriesCount--;
            }
        }
    );

    return pswLenGenerated;
}
