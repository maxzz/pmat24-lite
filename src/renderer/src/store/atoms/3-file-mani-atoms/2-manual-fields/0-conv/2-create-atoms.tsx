import { atom } from "jotai";
import { atomWithCallback, type Atomize } from "@/util-hooks";
import { type ManualFieldState } from "../9-types";
import { type EditorDataForOne, type EditorField, convFieldForEditor, uuid } from "@/store/manifest";
import { NormalFieldConv, type NormalField } from "../../1-normal-fields";
import { createAtomForCheck, createAtomForInput, dataForStateAtom, type OnChangeValueWithUpdateName, validateNumber, validateNumberMinMax } from "@/ui/local-ui/1-input-validate";

export function createAtom(chunk: EditorDataForOne, onChange: OnChangeValueWithUpdateName): ManualFieldState.ForAtoms {
    const uid5 = uuid.asRelativeNumber();
    const selectedAtom = atom(false);
    const validateOptions = { validate: validateNumber, options: { initialValidate: true } };

    switch (chunk.type) {
        case "kbd": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(`${name}-${uid5}`)({ get, set, nextValue: rv });
                };
            };

            const repeatData = dataForStateAtom(chunk.repeat, { validate: validateNumberMinMax(1, 9999, 'Repeat key'), options: { initialValidate: true }, });

            const chunkData = {
                charAtom: createAtomForInput(chunk.char, onScopedChange('kbd-key')),
                repeatAtom: atomWithCallback(repeatData, onScopedChange('kbd-repeat')),
                shiftAtom: createAtomForInput(chunk.shift, onScopedChange('kbd-shift')),
                ctrlAtom: createAtomForInput(chunk.ctrl, onScopedChange('kbd-ctrl')),
                altAtom: createAtomForInput(chunk.alt, onScopedChange('kbd-alt')),
            };

            const rv: ManualFieldState.KbdForAtoms = {
                type: 'kbd',
                uid5,
                selectedAtom,
                hasErrorAtom: atom(!!repeatData.error),
                original: chunk,
                ...chunkData,
            };
            return rv;
        }
        case "pos": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(`${name}-${uid5}`)({ get, set, nextValue: rv });
                };
            };

            const xData = dataForStateAtom(chunk.x, validateOptions);
            const yData = dataForStateAtom(chunk.y, validateOptions);
            const resData = dataForStateAtom(chunk.res, validateOptions);

            const chunkData = {
                xAtom: atomWithCallback(xData, onScopedChange('pos-x')),
                yAtom: atomWithCallback(yData, onScopedChange('pos-y')),
                unitsAtom: createAtomForCheck(chunk.units, onScopedChange('pos-units')),
                resAtom: atomWithCallback(resData, onScopedChange('pos-res')),
            };

            const rv: ManualFieldState.PosForAtoms = {
                type: 'pos',
                uid5,
                selectedAtom,
                hasErrorAtom: atom(!!xData.error || !!yData.error || !!resData.error),
                original: chunk,
                ...chunkData,
            };
            return rv;
        }
        case "dly": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(`${name}-${uid5}`)({ get, set, nextValue: rv });
                };
            };

            const nData = dataForStateAtom(chunk.n, validateOptions);

            const chunkData = {
                nAtom: atomWithCallback(nData, onScopedChange('dly-dly')),
            };

            const rv: ManualFieldState.DlyForAtoms = {
                type: 'dly',
                uid5,
                selectedAtom,
                hasErrorAtom: atom(!!nData.error),
                original: chunk,
                ...chunkData,
            };
            return rv;
        }
        case "fld": {
            function onScopedChange(name: string) {
                return ({ get, set, nextValue }): void => {
                    onChange(`${name}-${uid5}`)({ get, set, nextValue: rv });
                };
            };

            const fieldForAtoms: EditorField.ForAtoms = convFieldForEditor(chunk.field.mani);
            const fldAtoms: Atomize<EditorField.ForAtoms> = NormalFieldConv.createAtoms(fieldForAtoms, onScopedChange(`fld`));
            const rowAtoms: NormalField.RowAtoms = {
                ...fldAtoms,
                metaField: chunk.field,
                fromFile: fieldForAtoms,
            };

            const rv: ManualFieldState.FldForAtoms = {
                type: 'fld',
                uid5,
                selectedAtom,
                hasErrorAtom: atom(false),
                original: chunk,

                rowAtoms: rowAtoms,
            };
            return rv;
        }
    }
}

export function createAtoms(initialState: EditorDataForOne[], onChange: OnChangeValueWithUpdateName): ManualFieldState.ForAtoms[] {
    const scriptAtoms = initialState.map((chunk, idx) => createAtom(chunk, onChange));
    return scriptAtoms;
}
