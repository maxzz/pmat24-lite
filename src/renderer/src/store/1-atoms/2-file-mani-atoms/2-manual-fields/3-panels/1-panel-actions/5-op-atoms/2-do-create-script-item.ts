import { type Getter, type Setter, atom } from "jotai";
import { clamp } from "@/utils";
import { type OnChangeValueWithUpdateName } from "@/ui/local-ui";
import { type ManualFieldState } from "../../../9-types";
import { type ChunkKey, cpassEditorData, createScriptItemByType, FormIdx, loginEditorData } from "@/store/manifest";
import { type MFormProps, type MFormCnt } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { deselectCurrent, doSelectIdxAtom } from "./1-select-atoms";
import { ManualFieldConv } from "../../../0-conv";

export const doCreateScriptItemAtom = atom(
    null,
    (get, set, mFormProps: MFormProps, type: ChunkKey, password: boolean) => {
        const cnt: MFormCnt = mFormProps.mFormCtx.manual;

        const newItem = createScriptItem(type, password, 'No name', cnt.onChangeItem);

        insertScriptItems([newItem], cnt, get, set);
    }
);

function createScriptItem(type: ChunkKey, password: boolean, name: string, onChange: OnChangeValueWithUpdateName): ManualFieldState.Ctx {
    const newItem = createScriptItemByType({ type, password, name });
    const rv = ManualFieldConv.createManualAtom(newItem, onChange);
    return rv;
}

export const doCreateDefaultScriptItemsAtom = atom(
    null,
    (get, set, mFormCnt: MFormCnt, formIdx: FormIdx) => {
        const fields = formIdx === FormIdx.login ? loginEditorData() : cpassEditorData();

        const newItems = fields.map((field, idx) => ManualFieldConv.createManualAtom(field, mFormCnt.onChangeItem));

        insertScriptItems(newItems, mFormCnt, get, set);
    }
);

function insertScriptItems(newItems: ManualFieldState.Ctx[], mFormCnt: MFormCnt, get: Getter, set: Setter) {
    deselectCurrent(mFormCnt, get, set);

    const chunks = get(mFormCnt.chunksAtom);

    let selectedIdx = get(mFormCnt.selectedIdxStoreAtom);
    selectedIdx = clamp(selectedIdx + 1, 0, chunks.length - 1);

    const newChunks = [...chunks];
    newChunks.splice(selectedIdx, 0, ...newItems);

    set(mFormCnt.chunksAtom, newChunks);

    set(doSelectIdxAtom, mFormCnt, selectedIdx);
}