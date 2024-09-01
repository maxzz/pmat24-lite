import { atom } from "jotai";
import { type Atomize } from "@/util-hooks";
import { type ManualFieldState } from "../9-types";
import { type EditorDataForOne, uuid } from "@/store/manifest";
import { NormalFieldConv, type NormalField } from "../../1-normal-fields";
import { newAtomForCheck, newAtomForInput, OnChangeValueWithUpdateName, validateNumber } from "@/ui/local-ui/1-input-validate";

export function createAtom(chunk: EditorDataForOne, onChange: OnChangeValueWithUpdateName): ManualFieldState.ForAtoms {
    const uid5 = uuid.asRelativeNumber();
    const selectedAtom = atom(false);
    switch (chunk.type) {
        case "kbd": {
            const rv: ManualFieldState.KbdForAtoms = {
                type: 'kbd',
                uid5,
                selectedAtom,
                original: chunk,
                charAtom: newAtomForInput(chunk.char, onChange('man-kbd-key')),
                repeatAtom: newAtomForInput(chunk.repeat, onChange('man-kbd-repeat'), { validate: validateNumber }),
                shiftAtom: newAtomForInput(chunk.shift, onChange('man-kbd-shift')),
                ctrlAtom: newAtomForInput(chunk.ctrl, onChange('man-kbd-ctrl')),
                altAtom: newAtomForInput(chunk.alt, onChange('man-kbd-alt')),
            };
            return rv;
        }
        case "pos": {
            const rv: ManualFieldState.PosForAtoms = {
                type: 'pos',
                uid5,
                selectedAtom,
                original: chunk,
                xAtom: newAtomForInput(chunk.x, onChange('man-pos-x'), { validate: validateNumber }),
                yAtom: newAtomForInput(chunk.y, onChange('man-pos-y'), { validate: validateNumber }),
                unitsAtom: newAtomForCheck(chunk.units, onChange('man-pos-units')),
                resAtom: newAtomForInput(chunk.res, onChange('man-pos-res'), { validate: validateNumber }),
            };
            return rv;
        }
        case "dly": {
            const rv: ManualFieldState.DlyForAtoms = {
                type: 'dly',
                uid5,
                selectedAtom,
                original: chunk,
                nAtom: newAtomForInput(chunk.n, onChange('man-dly-dly'), { validate: validateNumber }),
            };
            return rv;
        }
        case "fld": {
            const fieldforAtoms: NormalField.ForAtoms = NormalFieldConv.forAtoms(chunk.field.mani);
            const fld: Atomize<NormalField.ForAtoms> = NormalFieldConv.createAtoms(fieldforAtoms, () => onChange(`man-fld-${uid5}`));
            const embFld: NormalField.FieldAtoms = {
                ...fld,
                metaField: chunk.field,
                fromFile: fieldforAtoms,
                changed: false,
            };

            const rv: ManualFieldState.FldForAtoms = {
                type: 'fld',
                uid5,
                selectedAtom,
                original: chunk,
                field: embFld,
            };
            return rv;
        }
    }
}

export function createAtoms(initialState: EditorDataForOne[], onChange: OnChangeValueWithUpdateName): ManualFieldState.ForAtoms[] {
    const scriptAtoms = initialState.map((chunk, idx) => createAtom(chunk, onChange));
    return scriptAtoms;
}
