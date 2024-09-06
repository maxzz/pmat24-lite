import { type Getter } from "jotai";
import { type EditorDataForDly, type EditorDataForFld, type EditorDataForKbd, type EditorDataForPos, type EditorDataForOne } from "@/store/manifest";
import { type ManualFieldState } from "../9-types";
import { NormalField, NormalFieldConv } from "../../1-normal-fields";
import { getKbdAtomsRowInputState, getPosAtomsRowInputState, getDlyAtomsRowInputState } from "./6-verify-state-access";

export function fromAtom(scriptItem: ManualFieldState.ForAtoms, get: Getter): EditorDataForOne {
    switch (scriptItem.type) {
        case "kbd": {
            const { char, repeat, shift, ctrl, alt } = getKbdAtomsRowInputState(scriptItem, get);
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
            const { x, y, units, res } = getPosAtomsRowInputState(scriptItem, get);
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
            const { n } = getDlyAtomsRowInputState(scriptItem, get);
            const rv: EditorDataForDly = {
                type: 'dly',
                n: +n.data,
            };
            return rv;
        }
        case "fld": {
            const fromAtomValues: NormalField.ForAtoms = NormalFieldConv.fromAtoms(scriptItem.field, get);
            // const editorValues: NormalField.ThisType = NormalFieldConv.forMani(fromAtomValues);
            const rv: EditorDataForFld = {
                type: 'fld',
                field: scriptItem.field.metaField,
                // editField: editorValues,
                editField: fromAtomValues,
            };
            return rv;
        }
    }
}

export function fromAtoms(scriptItems: ManualFieldState.ForAtoms[], get: Getter): EditorDataForOne[] {
    const chunks = scriptItems.map((scriptItem) => fromAtom(scriptItem, get));
    return chunks;
}
