import { ChSet } from "../../3-parser";
import { genUtils } from "../9-gen-utils/8-utils";

export class ChSetExtra {
    chSet: ChSet;
    min = -1;
    max = -1;
    isGenerated = false;
    generatedLen = -1;

    constructor(chSet: ChSet, min: number, max: number) {
        this.chSet = chSet;
        this.min = min;
        this.max = max;
    }

    generateLength(): boolean {
        if (this.isGenerated) {
            return true;
        }

        if (this.min === -1 && this.max === -1) {
            this.min = this.max = 1;
        } else if (this.max === -2) {
            return false;
        }

        this.generatedLen = genUtils.getRandomInRange(this.min, this.max);
        this.isGenerated = this.generatedLen >= this.min && this.generatedLen <= this.max;

        return this.isGenerated;
    }

    generateValue(excludeChars: string): string {
        let rv = genUtils.genPswPartByChars(this.chSet.chars, excludeChars, this.generatedLen);
        return rv;
    }
}

export type ChSetExtraMap = Map<ChSet, ChSetExtra>;
