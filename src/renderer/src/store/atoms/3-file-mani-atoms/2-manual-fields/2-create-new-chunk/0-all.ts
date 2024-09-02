import { type ManualFieldState } from "../9-types";
import { type OnChangeValueWithUpdateName } from "@/ui";
import type { ChunkKey, EditorDataForDly, EditorDataForFld, EditorDataForKbd, EditorDataForPos, EditorDataForOne } from "@/store/manifest";
import { ManualFieldConv } from "../0-conv";
import { createForManualMetaField } from "./2-create-for-manual-meta-field";

function createScriptItemByType({ type, password }: { type: ChunkKey; password: boolean; }): EditorDataForOne {
    switch (type) {
        case "fld": {
            const newItem: EditorDataForFld = {
                type: 'fld',
                field: createForManualMetaField(password),
            };
            return newItem;
        }
        case "kbd": {
            const newItem: EditorDataForKbd = {
                type: 'kbd',
                char: 'Tab',
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

export function createScriptItem(type: ChunkKey, password: boolean, onChange: OnChangeValueWithUpdateName): ManualFieldState.ForAtoms {
    const rv: ManualFieldState.ForAtoms = ManualFieldConv.createAtom(createScriptItemByType({type, password}), onChange);
    return rv;
}

// ./6-do-create-item.ts
// TODO: make doCreateItemAtom.onChange real - done

// ./a-create-script-item.ts
// pidx: 0, //TODO: initiate with correct value - done
// ridx: 0, //TODO: initiate with correct value - done

// ./1-fields-atoms.tsx
//TOOD: onChangeItem and onChangeOrder - done
