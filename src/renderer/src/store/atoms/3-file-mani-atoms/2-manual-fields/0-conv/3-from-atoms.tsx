import { type Getter, type Setter } from "jotai";
import { EditorDataForDly, EditorDataForFld, EditorDataForKbd, EditorDataForPos, ScriptChunkEditorData } from "pm-manifest";
import { type ManualFieldState } from "./9-types";

function fromAtom(scriptItem: ManualFieldState.ForAtoms, get: Getter, set: Setter): ScriptChunkEditorData {
    switch (scriptItem.type) {
        case "kbd": {
            const char = get(scriptItem.charAtom);
            const repeat = get(scriptItem.repeatAtom);
            const shift = get(scriptItem.shiftAtom);
            const ctrl = get(scriptItem.ctrlAtom);
            const alt = get(scriptItem.altAtom);
            const rv: EditorDataForKbd = {
                type: 'kbd',
                char: char.data,
                repeat: +repeat.data,
                shift: +shift.data,
                ctrl: +ctrl.data,
                alt: +alt.data,
            };
            return rv;
        }
        case "pos": {
            const x = get(scriptItem.xAtom);
            const y = get(scriptItem.yAtom);
            const units = get(scriptItem.unitsAtom);
            const res = get(scriptItem.resAtom);
            const rv: EditorDataForPos = {
                type: 'pos',
                x: +x.data,
                y: +y.data,
                units: !!units.data,
                res: +res.data,
            };
            return rv;
        }
        case "dly": {
            const n = get(scriptItem.nAtom);
            const rv: EditorDataForDly = {
                type: 'dly',
                n: +n.data,
            };
            return rv;
        }
        case "fld": {
            // const fromAtomValues: NormalField.FieldForAtoms = NormalFieldConv.fromAtoms(atom.field, get, set);
            // const maniValues = NormalFieldConv.forMani(fromAtomValues);
            // const fileValues = ManiConv.fieldForFileMani(maniValues, fieldAtoms.metaField, undefined, false);

            //TODO: this is not correct, need to get the field values from the atom
            const rv: EditorDataForFld = {
                type: 'fld',
                field: scriptItem.field.metaField,
            };
            return rv;
        }
    }
}

export function fromAtoms(scriptItems: ManualFieldState.ForAtoms[], get: Getter, set: Setter): ScriptChunkEditorData[] {
    const chunks = scriptItems.map((scriptItem) => fromAtom(scriptItem, get, set));
    return chunks;
}
