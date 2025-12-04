import { atom } from "jotai";
import { clamp } from "@/utils";
import { type EditorDataForOne, type ChunkKey, cpassEditorData, createScriptItemByType, FormIdx, loginEditorData } from "@/store/8-manifest";
import { type MFormProps, type MFormCnt, type MFormCtx } from "@/store/2-file-mani-atoms/9-types";
import { ManualFieldConv } from "../../../2-conv-manual";
import { deselectCurrent, doSelectIdxAtom } from "./1-select-atoms";
import { asyncSelectPanelActionsList } from "./d-panel-actions-list-activation";

export const doCreateScriptItemAtom = atom(
    null,
    (get, set, mFormProps: MFormProps, type: ChunkKey, password: boolean | undefined, formIdx: FormIdx, isCtrlKey: boolean): void => {
        const fieldData = createScriptItemByType({ formIdx, type, password: !!password, name: 'No name' });
        insertScriptItems([fieldData], mFormProps.mFormCtx.manual, isCtrlKey, { get, set });
        asyncSelectPanelActionsList(formIdx);
    }
);

export const doCreateDefaultScriptItemsAtom = atom(
    null,
    (get, set, mFormCtx: MFormCtx, formIdx: FormIdx, isCtrlKey: boolean) => {
        const fieldsData = formIdx === FormIdx.login ? loginEditorData() : cpassEditorData();
        insertScriptItems(fieldsData, mFormCtx.manual, isCtrlKey, { get, set });
        asyncSelectPanelActionsList(formIdx);
    }
);

/**
 * @param isCtrlKey - if true then create default script items will be created before selected item, by default they will be created after selected item. TODO: not implemented yet
 */
function insertScriptItems(fieldsData: EditorDataForOne[], mFormCnt: MFormCnt, isCtrlKey: boolean, { get, set }: GetSet): void {
    const newItems = fieldsData.map((field) => ManualFieldConv.createManualAtom(field, mFormCnt.onChangeItem));

    deselectCurrent(mFormCnt, { get, set });

    const chunks = get(mFormCnt.chunksAtom);

    let selectedIdx = get(mFormCnt.selectedIdxStoreAtom);
    selectedIdx = clamp(selectedIdx + 1, 0, chunks.length ? chunks.length - 1 : 0);

    const newChunks = [...chunks];
    newChunks.splice(selectedIdx, 0, ...newItems);

    set(mFormCnt.chunksAtom, newChunks);

    set(doSelectIdxAtom, mFormCnt, selectedIdx);
}
