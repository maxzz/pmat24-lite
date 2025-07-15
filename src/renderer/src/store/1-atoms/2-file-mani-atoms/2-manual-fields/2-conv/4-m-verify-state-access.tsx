import { type PrimitiveAtom, type Getter } from "jotai";
import { type ManualFieldState } from "../9-types";
import { type RowInputState } from "@/ui";
import { type EditorDataForDly, type EditorDataForKbd, type EditorDataForPos } from "@/store/manifest";

type EditorValues<T> = {
    [key in keyof T]: RowInputState;
};

export function getKbdChunkValues(atoms: ManualFieldState.CtxKbd, get: Getter): EditorValues<Omit<EditorDataForKbd, 'type'>> {
    const rv = {
        char: get(atoms.charAtom),
        repeat: get(atoms.repeatAtom),
        shift: get(atoms.shiftAtom),
        ctrl: get(atoms.ctrlAtom),
        alt: get(atoms.altAtom),
    };
    return rv;
}

export function getPosChunkValues(atoms: ManualFieldState.CtxPos, get: Getter): EditorValues<Omit<EditorDataForPos, 'type'>> {
    const rv = {
        x: get(atoms.xAtom),
        y: get(atoms.yAtom),
        units: get(atoms.unitsAtom),
        res: get(atoms.resAtom),
    };
    return rv;
}

export function getDlyChunkValues(atoms: ManualFieldState.CtxDly, get: Getter): EditorValues<Omit<EditorDataForDly, 'type'>> {
    const rv = {
        n: get(atoms.nAtom),
    };
    return rv;
}

export type RowInputStateUuid = RowInputState & { uuid: number; chunk: ManualFieldState.Ctx; };

export function getChunkValuesForValidate(chunk: ManualFieldState.Ctx, get: Getter): RowInputStateUuid[] {
    const rv: RowInputState[] = [];
    switch (chunk.type) {
        case "kbd": {
            const { char, repeat, shift, ctrl, alt } = getKbdChunkValues(chunk, get);
            rv.push(char, repeat, shift, ctrl, alt);
            break;
        }
        case "pos": {
            const { x, y, units, res } = getPosChunkValues(chunk, get);
            rv.push(x, y, units, res);
            break;
        }
        case "dly": {
            const { n } = getDlyChunkValues(chunk, get);
            rv.push(n);
            break;
        }
        case "fld": {
            break;
        }
    }
    return rv.map((item) => ({ ...item, uuid: chunk.uid5, chunk }));
}

export function getAllAtomValuesForValidate(chunks: ManualFieldState.Ctx[], get: Getter): RowInputStateUuid[] {
    const rv = chunks.map((chunk) => getChunkValuesForValidate(chunk, get));
    return rv.flat();
}
