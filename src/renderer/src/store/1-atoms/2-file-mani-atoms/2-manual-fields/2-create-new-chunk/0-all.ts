import { type ManualFieldState } from "../9-types";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { type ChunkKey, type EditorDataForDly, type EditorDataForFld, type EditorDataForKbd, type EditorDataForPos, type EditorDataForOne, convFieldForEditor } from "@/store/manifest";
import { ManualFieldConv } from "../0-conv";
import { createForManualMetaField } from "./2-create-for-manual-meta-field";

function createScriptItemByType({ type, password }: { type: ChunkKey; password: boolean; }): EditorDataForOne {
    switch (type) {
        case "fld": {
            const field = createForManualMetaField(password);
            const editField = convFieldForEditor(field.mani);
            const newItem: EditorDataForFld = {
                type: 'fld',
                field,
                editField,
            };
            return newItem;
        }
        case "kbd": {
            const newItem: EditorDataForKbd = {
                type: 'kbd',
                char: 'tab',
                repeat: 1,
                shift: 0,
                ctrl: 0,
                alt: 0,
            };
            return newItem;
        }
        case "pos": {
            const newItem: EditorDataForPos = {
                type: 'pos',
                x: 10,
                y: 20,
                units: false,
                res: 0,
            };
            return newItem;
        }
        case "dly": {
            const newItem: EditorDataForDly = {
                type: 'dly',
                n: 1000,
            };
            return newItem;
        }
        default: {
            const really: never = type;
            throw new Error(really);
        }
    }
}

export function createScriptItem(type: ChunkKey, password: boolean, onChange: OnChangeValueWithUpdateName): ManualFieldState.Ctx {
    const newItem = createScriptItemByType({type, password});
    const rv = ManualFieldConv.createAtom(newItem, onChange);
    return rv;
}
