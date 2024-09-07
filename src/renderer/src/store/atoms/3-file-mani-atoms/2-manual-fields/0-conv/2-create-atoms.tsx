import { atom } from "jotai";
import { type Atomize } from "@/util-hooks";
import { type ManualFieldState } from "../9-types";
import { type EditorDataForOne, fieldForEditor, uuid } from "@/store/manifest";
import { NormalFieldConv, type NormalField } from "../../1-normal-fields";
import { newAtomForCheck, newAtomForInput, type OnChangeValueWithUpdateName, validateNumber, validateNumberMinMax } from "@/ui/local-ui/1-input-validate";

export function createAtom(chunk: EditorDataForOne, onChange: OnChangeValueWithUpdateName): ManualFieldState.ForAtoms {
    const uid5 = uuid.asRelativeNumber();
    const selectedAtom = atom(false);
    const hasErrorAtom = atom(false);
    switch (chunk.type) {
        case "kbd": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(`${name}-${uid5}`)({ get, set, nextValue: rv });
                };
            };

            const rv: ManualFieldState.KbdForAtoms = {
                type: 'kbd',
                uid5,
                selectedAtom,
                hasErrorAtom,
                original: chunk,

                charAtom: newAtomForInput(chunk.char, onScopedChange('kbd-key')),
                repeatAtom: newAtomForInput(chunk.repeat, onScopedChange('kbd-repeat'), { validate: validateNumberMinMax(1, 9999) }),
                shiftAtom: newAtomForInput(chunk.shift, onScopedChange('kbd-shift')),
                ctrlAtom: newAtomForInput(chunk.ctrl, onScopedChange('kbd-ctrl')),
                altAtom: newAtomForInput(chunk.alt, onScopedChange('kbd-alt')),
            };
            return rv;
        }
        case "pos": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(`${name}-${uid5}`)({ get, set, nextValue: rv });
                };
            };

            const rv: ManualFieldState.PosForAtoms = {
                type: 'pos',
                uid5,
                selectedAtom,
                hasErrorAtom,
                original: chunk,

                xAtom: newAtomForInput(chunk.x, onScopedChange('pos-x'), { validate: validateNumber }),
                yAtom: newAtomForInput(chunk.y, onScopedChange('pos-y'), { validate: validateNumber }),
                unitsAtom: newAtomForCheck(chunk.units, onScopedChange('pos-units')),
                resAtom: newAtomForInput(chunk.res, onScopedChange('pos-res'), { validate: validateNumber }),
            };
            return rv;
        }
        case "dly": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(`${name}-${uid5}`)({ get, set, nextValue: rv });
                };
            };

            const rv: ManualFieldState.DlyForAtoms = {
                type: 'dly',
                uid5,
                selectedAtom,
                hasErrorAtom,
                original: chunk,

                nAtom: newAtomForInput(chunk.n, onScopedChange('dly-dly'), { validate: validateNumber }),
            };
            return rv;
        }
        case "fld": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(`${name}-${uid5}`)({ get, set, nextValue: rv });
                };
            };

            const fieldForAtoms: NormalField.ForAtoms = fieldForEditor(chunk.field.mani);
            const fldAtoms: Atomize<NormalField.ForAtoms> = NormalFieldConv.createAtoms(fieldForAtoms, onScopedChange(`fld`));
            const embFld: NormalField.FieldAtoms = {
                ...fldAtoms,
                metaField: chunk.field,
                fromFile: fieldForAtoms,
                changed: false,
            };

            const rv: ManualFieldState.FldForAtoms = {
                type: 'fld',
                uid5,
                selectedAtom,
                hasErrorAtom,
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
