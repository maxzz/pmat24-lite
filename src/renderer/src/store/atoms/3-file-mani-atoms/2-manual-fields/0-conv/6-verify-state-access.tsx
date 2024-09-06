import type { Getter } from "jotai";
import type { ManualFieldState } from "../9-types";

export function getKbdAtomsRowInputState(atoms: ManualFieldState.KbdForAtoms, get: Getter) {
    const rv = {
        char: get(atoms.charAtom),
        repeat: get(atoms.repeatAtom),
        shift: get(atoms.shiftAtom),
        ctrl: get(atoms.ctrlAtom),
        alt: get(atoms.altAtom),
    };
    return rv;
}

export function getPosAtomsRowInputState(atoms: ManualFieldState.PosForAtoms, get: Getter) {
    const rv = {
        x: get(atoms.xAtom),
        y: get(atoms.yAtom),
        units: get(atoms.unitsAtom),
        res: get(atoms.resAtom),
    };
    return rv;
}

export function getDlyAtomsRowInputState(atoms: ManualFieldState.DlyForAtoms, get: Getter) {
    const rv = {
        n: get(atoms.nAtom),
    };
    return rv;
}
