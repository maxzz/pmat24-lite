import { atom } from "jotai";
import { clamp } from "@/utils";
import { type OnChangeValueWithUpdateName } from "@/ui/local-ui";
import { type ManualFieldState } from "../../../9-types";
import { type ChunkKey, createScriptItemByType, FormIdx } from "@/store/manifest";
import { type MFormContextProps, type MFormCtx } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { deselectCurrent, doSelectIdxAtom } from "./1-select-atoms";
import { ManualFieldConv } from "../../../0-conv";

export const doCreateItemAtom = atom(
    null,
    (get, set, formCtx: MFormContextProps, type: ChunkKey, password: boolean) => {
        const ctx: MFormCtx = formCtx.mAllAtoms.manual;

        const newItem = createScriptItem(type, password, ctx.onChangeItem, formCtx.formIdx === FormIdx.cpass);

        deselectCurrent(ctx, get, set);

        const chunks = get(ctx.chunksAtom);

        let selectedIdx = get(ctx.selectedIdxStoreAtom);
        selectedIdx = clamp(selectedIdx + 1, 0, chunks.length - 1);

        const newChunks = [...chunks];
        newChunks.splice(selectedIdx, 0, newItem);

        set(ctx.chunksAtom, newChunks);

        set(doSelectIdxAtom, ctx, selectedIdx);
    }
);

function createScriptItem(type: ChunkKey, password: boolean, onChange: OnChangeValueWithUpdateName, isCpassForm: boolean): ManualFieldState.Ctx {
    const newItem = createScriptItemByType({type, password});
    const rv = ManualFieldConv.createAtom(newItem, onChange, isCpassForm);
    return rv;
}
