import { ChSet } from "../../3-parser/1-parser-types";
import { genUtils } from "../9-gen-utils";

export class ChSetExtra {
    chSet: ChSet;
    min: number;
    max: number;
    wasGenerated = false;
    generatedLen = -1;

    constructor(chSet: ChSet) {
        this.chSet = chSet;
        this.min = chSet.min;
        this.max = chSet.max;
    }

    checkWasLenGenerated(): boolean {
        if (this.wasGenerated) {
            return true;
        }

        if (this.min === -1 && this.max === -1) {
            this.min = 1;
            this.max = 1;
        }
        else if (this.max === -2) {
            return false;
        }

        this.generatedLen = genUtils.getRandomInRange(this.min, this.max);
        this.wasGenerated = this.generatedLen >= this.min && this.generatedLen <= this.max;

        return this.wasGenerated;
    }

    generateValue(excludeChars: string): string {
        let rv = genUtils.genPswPartByChars(this.chSet.chars, excludeChars, this.generatedLen);
        return rv;
    }
}

export type ChSetExtraMap = Map<ChSet, ChSetExtra>;
