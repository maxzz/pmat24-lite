import { EditorDataForDly, EditorDataForFld, EditorDataForKbd, EditorDataForPos } from "@/store/manifest";
import { ManualFieldState } from "../9-types";

export function chunksToString(chunks: ManualFieldState.ForAtoms[]): string {
    return chunks.map((chunk) => chunk.uid5).join("");
}

export function areTheSameOrder(chunks: ManualFieldState.ForAtoms[], initialChunks: string): boolean {
    const rv = chunksToString(chunks) === initialChunks;
    return rv;
}

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

//export function areTheSameFld(from: EditorDataForFld, to: EditorDataForFld): boolean {
