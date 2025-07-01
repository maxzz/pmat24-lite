import { atom } from "jotai";
import { clamp } from "@/utils";
import { type OnChangeValueWithUpdateName } from "@/ui/local-ui";
import { type ManualFieldState } from "../../../9-types";
import { type ChunkKey, createScriptItemByType, FormIdx } from "@/store/manifest";
import { type MFormProps, type MFormCnt } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { deselectCurrent, doSelectIdxAtom } from "./1-select-atoms";
import { ManualFieldConv } from "../../../0-conv";

export const doCreateItemAtom = atom(
    null,
    (get, set, mFormProps: MFormProps, type: ChunkKey, password: boolean) => {
        const cnt: MFormCnt = mFormProps.mAllAtoms.manual;

        const newItem = createScriptItem(type, password, cnt.onChangeItem, mFormProps.formIdx === FormIdx.cpass);

        deselectCurrent(cnt, get, set);

        const chunks = get(cnt.chunksAtom);

        let selectedIdx = get(cnt.selectedIdxStoreAtom);
        selectedIdx = clamp(selectedIdx + 1, 0, chunks.length - 1);

        const newChunks = [...chunks];
        newChunks.splice(selectedIdx, 0, newItem);

        set(cnt.chunksAtom, newChunks);

        set(doSelectIdxAtom, cnt, selectedIdx);
    }
);

function createScriptItem(type: ChunkKey, password: boolean, onChange: OnChangeValueWithUpdateName, isCpassForm: boolean): ManualFieldState.Ctx {
    const newItem = createScriptItemByType({type, password});
    const rv = ManualFieldConv.createAtom(newItem, onChange, isCpassForm);
    return rv;
}
