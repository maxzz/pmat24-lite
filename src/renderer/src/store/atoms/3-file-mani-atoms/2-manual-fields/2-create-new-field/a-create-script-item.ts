import { atom } from "jotai";
import { ChunkKey, EditorDataForDly, EditorDataForFld, EditorDataForKbd, EditorDataForPos, FieldTyp, Mani, Meta, EditorDataForOne, uuid, ValueAs } from "@/store/manifest";
import { ManualFieldState } from "../9-types";
import { ManualFieldConv } from "../0-conv";
import { OnChangeValueWithUpdateName } from "@/ui";

function createForManualManiField(): Mani.Field {
    const rv: Mani.Field = {
        type: "edit",
        displayname: '',
        dbname: 'TODO: guid',
    };
    return rv;
}

function createForManualMetaField(): Meta.Field {
    const rv: Meta.Field = {
        mani: createForManualManiField(),
        ftyp: FieldTyp.text,
        life: {
            valueAs: ValueAs.askReuse,
        },
        path: {},
        pidx: 0, // index is irrelevant for manual fields for now
        ridx: 0, // index is irrelevant for manual fields for now
        uuid: uuid.asRelativeNumber(),
    };
    return rv;
}

function createScriptItemByType(type: ChunkKey): EditorDataForOne {
    switch (type) {
        case "fld": {
            const newItem: EditorDataForFld = {
                type: 'fld',
                field: createForManualMetaField(),
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

export function createScriptItem(type: ChunkKey, onChange: OnChangeValueWithUpdateName): ManualFieldState.ForAtoms {
    const rv: ManualFieldState.ForAtoms = ManualFieldConv.createAtom(createScriptItemByType(type), onChange);
    return rv;
}

// ./6-do-create-item.ts
// TODO: make doCreateItemAtom.onChange real - done

// ./a-create-script-item.ts
// pidx: 0, //TODO: initiate with correct value
// ridx: 0, //TODO: initiate with correct value

// ./1-fields-atoms.tsx
//TOOD: onChangeItem and onChangeOrder
