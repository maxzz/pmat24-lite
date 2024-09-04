import { atom } from "jotai";
import { type Atomize } from "@/util-hooks";
import { type ManualFieldState } from "../9-types";
import { type EditorDataForOne, uuid } from "@/store/manifest";
import { NormalFieldConv, type NormalField } from "../../1-normal-fields";
import { newAtomForCheck, newAtomForInput, type OnChangeValueWithUpdateName, validateNumber } from "@/ui/local-ui/1-input-validate";

export function createAtom(chunk: EditorDataForOne, onChange: OnChangeValueWithUpdateName): ManualFieldState.ForAtoms {
    const uid5 = uuid.asRelativeNumber();
    const selectedAtom = atom(false);
    switch (chunk.type) {
        case "kbd": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(name)({ get, set, nextValue: rv });
                };
            };

            const rv: ManualFieldState.KbdForAtoms = {
                type: 'kbd',
                uid5,
                selectedAtom,
                original: chunk,

                charAtom: newAtomForInput(chunk.char, onScopedChange('man-kbd-key')),
                repeatAtom: newAtomForInput(chunk.repeat, onScopedChange('man-kbd-repeat'), { validate: validateNumber }),
                shiftAtom: newAtomForInput(chunk.shift, onScopedChange('man-kbd-shift')),
                ctrlAtom: newAtomForInput(chunk.ctrl, onScopedChange('man-kbd-ctrl')),
                altAtom: newAtomForInput(chunk.alt, onScopedChange('man-kbd-alt')),
            };
            return rv;
        }
        case "pos": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(name)({ get, set, nextValue: rv });
                };
            };

            const rv: ManualFieldState.PosForAtoms = {
                type: 'pos',
                uid5,
                selectedAtom,
                original: chunk,

                xAtom: newAtomForInput(chunk.x, onScopedChange('man-pos-x'), { validate: validateNumber }),
                yAtom: newAtomForInput(chunk.y, onScopedChange('man-pos-y'), { validate: validateNumber }),
                unitsAtom: newAtomForCheck(chunk.units, onScopedChange('man-pos-units')),
                resAtom: newAtomForInput(chunk.res, onScopedChange('man-pos-res'), { validate: validateNumber }),
            };
            return rv;
        }
        case "dly": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(name)({ get, set, nextValue: rv });
                };
            };

            const rv: ManualFieldState.DlyForAtoms = {
                type: 'dly',
                uid5,
                selectedAtom,
                original: chunk,

                nAtom: newAtomForInput(chunk.n, onScopedChange('man-dly-dly'), { validate: validateNumber }),
            };
            return rv;
        }
        case "fld": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(name)({ get, set, nextValue: rv });
                };
            };

            const fieldforAtoms: NormalField.ForAtoms = NormalFieldConv.forAtoms(chunk.field.mani);
            const fldAtoms: Atomize<NormalField.ForAtoms> = NormalFieldConv.createAtoms(fieldforAtoms, onScopedChange(`man-fld-${uid5}`));
            const embFld: NormalField.FieldAtoms = {
                ...fldAtoms,
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
