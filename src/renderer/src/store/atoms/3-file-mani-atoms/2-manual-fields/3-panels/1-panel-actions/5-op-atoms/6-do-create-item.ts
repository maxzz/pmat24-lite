import { atom } from "jotai";
import { ManualEditorState } from "../../../9-types";
import { ChunkKey } from "@/store/manifest";
import { OnValueChangeParams } from "@/util-hooks";
import { createScriptItem } from "./a-create-script-item";

export const doCreateItemAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, type: ChunkKey) => {

        const onChange = (updateName: string) => {
            return ({ get, set, nextValue }: OnValueChangeParams<any>) => {
                console.log('TODO: doCreateItemAtom.onChange', updateName);
            }
        }

        const newItem = createScriptItem(type, onChange);

        let chuncks = get(ctx.chunksAtom);
        chuncks.push(newItem);
        set(ctx.chunksAtom, chuncks);

        set(ctx.selectedIdxStoreAtom, chuncks.length - 1);
    }
);
