import { atom } from "jotai";
import { ChunkKey } from "@/store/manifest";
import { ManualEditorState } from "../../../9-types";
import { createScriptItem } from "../../../2-create-new-chunk";
import { doSelectIdxAtom } from "./1-do-select-idx";

export const doCreateItemAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, type: ChunkKey, password: boolean) => {

        const newItem = createScriptItem(type, password, ctx.onChangeItem); // `man-fld-${uid5}`

        let chunks = get(ctx.chunksAtom);
        const newChunks = [...chunks];
        newChunks.push(newItem);
        set(ctx.chunksAtom, newChunks);

        set(doSelectIdxAtom, ctx, newChunks.length - 1);
    }
);

// ./6-do-create-item.ts
// TODO: make doCreateItemAtom.onChange real

// ./a-create-script-item.ts
// pidx: 0, //TODO: initiate with correct value
// ridx: 0, //TODO: initiate with correct value

// ./1-fields-atoms.tsx
//TOOD: onChangeItem and onChangeOrder
