import { type Getter, type Setter, atom } from "jotai";
import { clamp } from "@/utils";
import { type EditorDataForOne, type ChunkKey, cpassEditorData, createScriptItemByType, FormIdx, loginEditorData } from "@/store/manifest";
import { type MFormProps, type MFormCnt } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { deselectCurrent, doSelectIdxAtom } from "./1-select-atoms";
import { ManualFieldConv } from "../../../0-conv";

export const doCreateScriptItemAtom = atom(
    null,
    (get, set, mFormProps: MFormProps, type: ChunkKey, password: boolean): void => {
        const fieldData = createScriptItemByType({ type, password, name: 'No name' });
        insertScriptItems([fieldData], mFormProps.mFormCtx.manual, get, set);
    }
);

export const doCreateDefaultScriptItemsAtom = atom(
    null,
    (get, set, mFormCnt: MFormCnt, formIdx: FormIdx): void => {
        const fieldsData = formIdx === FormIdx.login ? loginEditorData() : cpassEditorData();
        insertScriptItems(fieldsData, mFormCnt, get, set);
    }
);

function insertScriptItems(fieldsData: EditorDataForOne[], mFormCnt: MFormCnt, get: Getter, set: Setter): void {
    const newItems = fieldsData.map((field) => ManualFieldConv.createManualAtom(field, mFormCnt.onChangeItem));
    
    deselectCurrent(mFormCnt, get, set);

    const chunks = get(mFormCnt.chunksAtom);

    let selectedIdx = get(mFormCnt.selectedIdxStoreAtom);
    selectedIdx = clamp(selectedIdx + 1, 0, chunks.length - 1);

    const newChunks = [...chunks];
    newChunks.splice(selectedIdx, 0, ...newItems);

    set(mFormCnt.chunksAtom, newChunks);

    set(doSelectIdxAtom, mFormCnt, selectedIdx);
}
