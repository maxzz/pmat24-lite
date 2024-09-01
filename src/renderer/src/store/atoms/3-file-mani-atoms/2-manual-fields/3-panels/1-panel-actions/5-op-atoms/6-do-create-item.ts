import { atom } from "jotai";
import { ManualEditorState } from "../../../9-types";
import { ChunkKey } from "@/store/manifest";
import { createScriptItem } from "../../../2-create-new-field";

export const doCreateItemAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, type: ChunkKey) => {

        const newItem = createScriptItem(type, ctx.onChangeItem);

        let chuncks = get(ctx.chunksAtom);
        chuncks.push(newItem);
        set(ctx.chunksAtom, chuncks);

        set(ctx.selectedIdxStoreAtom, chuncks.length - 1);
    }
);

// ./6-do-create-item.ts
// TODO: make doCreateItemAtom.onChange real

// ./a-create-script-item.ts
// pidx: 0, //TODO: initiate with correct value
// ridx: 0, //TODO: initiate with correct value

// ./1-fields-atoms.tsx
//TOOD: onChangeItem and onChangeOrder
