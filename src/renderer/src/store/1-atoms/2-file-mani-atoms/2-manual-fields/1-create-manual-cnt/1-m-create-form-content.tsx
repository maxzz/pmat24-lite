import { type Getter, type Setter, atom } from "jotai";
import { atomWithCallback, debounce } from "@/utils";
import { type EditorDataForOne, parseForEditor } from "@/store/manifest";
import { type MFormCnt, type FileUsCtx, type OnChangeProps, fileUsChanges, safeByContext, safeManiAtomsFromFileUsCtx } from "../../9-types";
import { type ManualFieldState, ManualFieldConv } from "../2-conv";
import { NormalFieldConv } from "../../1-normal-fields";
import { createManualAtom } from "../2-conv/1-m-create-atoms";

export namespace ManualFieldsState {

    export function createManualFormCnt(fileUsCtx: FileUsCtx): MFormCnt {
        const { fileUs, formIdx } = fileUsCtx;
        const metaForm = safeByContext(fileUs?.parsedSrc?.meta)[formIdx]; // We are under createFormAtoms umbrella
        const editorData = parseForEditor(metaForm?.fields || []);

        const debouncedOnChangeOrderWithScope = debounce(onChangeWithScope);

        function onChangeOrder({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx[]; }) {
            debouncedOnChangeOrderWithScope('order', nextValue, { fileUsCtx, get, set });
        }

        const chunks: ManualFieldState.Ctx[] = createManualAtoms(editorData, fileUsCtx);

        const mFormCnt: MFormCnt = {
            chunksAtom: atomWithCallback(chunks, onChangeOrder),
            initialChunks: ManualFieldConv.chunksToCompareString(chunks),
            selectedIdxStoreAtom: atom(0),
            onChangeItem: createOnUpdateItemCb(fileUsCtx),
            onChangeOrder,
            fromFile: editorData,
        };
        return mFormCnt;
    }

    export function resetChunks(mFormCnt: MFormCnt, fileUsCtx: FileUsCtx, get: Getter, set: Setter) {
        const newChunks: ManualFieldState.Ctx[] = createManualAtoms(mFormCnt.fromFile, fileUsCtx);
        const newChunksStr = ManualFieldConv.chunksToCompareString(newChunks);

        set(mFormCnt.chunksAtom, newChunks);
        mFormCnt.initialChunks = newChunksStr;
    }

} //namespace ManualFieldsState

function createManualAtoms(initialState: EditorDataForOne[], fileUsCtx: FileUsCtx): ManualFieldState.Ctx[] {
    const ctxs = initialState.map(
        (chunk, idx) => {
            return createManualAtom(chunk, createOnUpdateItemCb(fileUsCtx));
        }
    );
    return ctxs;
}

// Debounced callback and callback

function createOnUpdateItemCb(fileUsCtx: FileUsCtx) {
    const debouncedOnChangeWithScope = debounce(onChangeWithScope, 200); // If any two values can be changed in the same time, then we should not use shared debounced function (case: uuid change and any other change).

    function scopeName(updateName: string) {
        function scopeNameAndAtomsAccess({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx; }) {
            debouncedOnChangeWithScope(updateName, nextValue, { fileUsCtx, get, set });
        }
        return scopeNameAndAtomsAccess;
    }

    return scopeName;
}

function onChangeWithScope(updateName: string, nextValue: ManualFieldState.Ctx | ManualFieldState.Ctx[], { fileUsCtx, get, set }: OnChangeProps) {
    const mFormCtx = safeManiAtomsFromFileUsCtx(fileUsCtx, get)[fileUsCtx?.formIdx]?.manual;
    if (!mFormCtx) {
        return;
    }

    if (Array.isArray(nextValue)) { // This call when chunks are re-ordered
        const chunks = get(mFormCtx.chunksAtom);
        const newChunksStr = ManualFieldConv.chunksToCompareString(chunks);
        const changed = newChunksStr !== mFormCtx.initialChunks;

        fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-manual-${updateName}`);
        //printChanges('onChangeWScope.chunks', updateName, nextValue, { fileUsCtx, get, set });
        return;
    }

    let changed: boolean | undefined;

    if (nextValue.type === 'fld') {
        const fromUi = NormalFieldConv.fromAtoms(nextValue.rowCtx, get, set);
        changed = !NormalFieldConv.areTheSame(fromUi, nextValue.rowCtx.fromFile);
    } else {
        const fromUi = ManualFieldConv.fromAtom(nextValue, get);
        changed = !ManualFieldConv.areTheSame(fromUi, nextValue.original);

        set(nextValue.hasErrorAtom, ManualFieldConv.isChunkInvalid(nextValue, get, set));
    }

    fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-manual-${updateName}`);
    //printChanges('onChangeWScope.item', updateName, nextValue, { fileUsCtx, get, set });
}

// Utilities

function printChanges(label: string, updateName: string, nextValue: ManualFieldState.Ctx | ManualFieldState.Ctx[], { fileUsCtx, get, set }: OnChangeProps) {
    console.log(`${label}: "${updateName}" chg:`, JSON.stringify([...fileUsCtx.fileUs.fileCnt.changesSet]), { nextValue });
}
