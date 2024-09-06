import { type Getter } from "jotai";
import { type ManualFieldState } from "../9-types";
import { type RowInputState } from "@/ui";
import { type EditorDataForDly, type EditorDataForKbd, type EditorDataForPos } from "@/store/manifest";

export type RowInputStateUuid = RowInputState & { uuid: number; };

type EditorValues<T> = {
    [key in keyof T]: RowInputState;
};

export function getKbdAtomsRowInputState(atoms: ManualFieldState.KbdForAtoms, get: Getter): EditorValues<Omit<EditorDataForKbd, 'type'>> {
    const rv = {
        char: get(atoms.charAtom),
        repeat: get(atoms.repeatAtom),
        shift: get(atoms.shiftAtom),
        ctrl: get(atoms.ctrlAtom),
        alt: get(atoms.altAtom),
    };
    return rv;
}

export function getPosAtomsRowInputState(atoms: ManualFieldState.PosForAtoms, get: Getter): EditorValues<Omit<EditorDataForPos, 'type'>> {
    const rv = {
        x: get(atoms.xAtom),
        y: get(atoms.yAtom),
        units: get(atoms.unitsAtom),
        res: get(atoms.resAtom),
    };
    return rv;
}

export function getDlyAtomsRowInputState(atoms: ManualFieldState.DlyForAtoms, get: Getter): EditorValues<Omit<EditorDataForDly, 'type'>> {
    const rv = {
        n: get(atoms.nAtom),
    };
    return rv;
}

function getValidateAtoms(scriptItem: ManualFieldState.ForAtoms, get: Getter): RowInputStateUuid[] {
    const rv: RowInputState[] = [];
    switch (scriptItem.type) {
        case "kbd": {
            const { char, repeat, shift, ctrl, alt } = getKbdAtomsRowInputState(scriptItem, get);
            rv.push(char, repeat, shift, ctrl, alt);
            break;
        }
        case "pos": {
            const { x, y, units, res } = getPosAtomsRowInputState(scriptItem, get);
            rv.push(x, y, units, res);
            break;
        }
        case "dly": {
            const { n } = getDlyAtomsRowInputState(scriptItem, get);
            rv.push(n);
            break;
        }
        case "fld": {
            break;
        }
    }
    return rv.map((item) => ({ ...item, uuid: scriptItem.uid5 }));
}

export function getAllValidateAtoms(chunks: ManualFieldState.ForAtoms[], get: Getter): RowInputStateUuid[] {
    const rv = chunks.map((chunk) => getValidateAtoms(chunk, get));
    return rv.flat();
}
