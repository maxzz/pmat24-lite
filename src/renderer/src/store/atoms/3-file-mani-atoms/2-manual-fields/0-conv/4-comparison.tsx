import { EditorDataForDly, EditorDataForFld, EditorDataForKbd, EditorDataForOne, EditorDataForPos } from "@/store/manifest";
import { ManualFieldState } from "../9-types";
import { NormalFieldConv } from "../../1-normal-fields";

//

export function chunksToCompareString(chunks: ManualFieldState.ForAtoms[]): string {
    return chunks.map((chunk) => chunk.uid5).join('');
}

export function areTheSameOrder(chunks: ManualFieldState.ForAtoms[], initialChunks: string): boolean {
    const rv = chunksToCompareString(chunks) === initialChunks;
    return rv;
}

//

export function areTheSameKbd(from: EditorDataForKbd, to: EditorDataForKbd): boolean {
    const rv = (
        from.char === to.char &&
        from.repeat === to.repeat &&
        from.alt === to.alt &&
        from.ctrl === to.ctrl &&
        from.shift === to.shift
    );
    return rv;
}

export function areTheSameDly(from: EditorDataForDly, to: EditorDataForDly): boolean {
    const rv = (
        from.n === to.n
    );
    return rv;
}

export function areTheSamePos(from: EditorDataForPos, to: EditorDataForPos): boolean {
    const rv = (
        from.x === to.x &&
        from.y === to.y &&
        from.units === to.units &&
        from.res === to.res
    );
    return rv;
}

//

export function areTheSame(from: EditorDataForOne, to: EditorDataForOne): boolean {
    switch (from.type) {
        case 'kbd': {
            return areTheSameKbd(from, to as EditorDataForKbd);
        }
        case 'dly': {
            return areTheSameDly(from, to as EditorDataForDly);
        }
        case 'pos': {
            return areTheSamePos(from, to as EditorDataForPos);
        }
        case 'fld': {
            //return NormalFieldConv.areTheSame(from.field.mani, (to as EditorDataForFld).field.mani);
            return false;
        }
    }
}
