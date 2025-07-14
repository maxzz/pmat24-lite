import { type Getter, type Setter, atom } from "jotai";
import { atomWithCallback, debounce } from "@/utils";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { type EditorDataForOne, FormIdx, parseForEditor } from "@/store/manifest";
import { type MFormCnt, type FileUsCtx, type ManiAtoms, type OnChangeProps, fileUsChanges, safeByContext } from "../../9-types";
import { type ManualFieldState, ManualFieldConv } from "../0-conv";
import { NormalFieldConv } from "../../1-normal-fields";
import { createManualAtom } from "../0-conv/1-m-create-atoms";

export namespace ManualFieldsState {

    export function createManualFormCnt(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): MFormCnt {
        const { fileUs, formIdx } = fileUsCtx;

        const metaForm = safeByContext(fileUs.parsedSrc.meta)[formIdx]; // We are under createFormAtoms umbrella

        const fields = metaForm.fields || [];

        const editorData = parseForEditor(fields);

        function onChangeItem(updateName: string) {
            function onChangeWName({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx; }) {
                //console.log(`createManualFormCnt.onChangeItem ${updateName}`, { nextValue });
                onChangeWithScopeDebounced(ctx, updateName, nextValue, { fileUsCtx, maniAtoms, get, set });
            };
            return onChangeWName;
        }

        function onChangeOrder({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx[]; }) {
            onChangeWithScopeDebounced(ctx, 'order', nextValue, { fileUsCtx, maniAtoms, get, set });
        }

        const chunks: ManualFieldState.Ctx[] = createManualAtoms(editorData, onChangeItem);

        const ctx: MFormCnt = {
            chunksAtom: atomWithCallback(chunks, onChangeOrder),
            initialChunks: ManualFieldConv.chunksToCompareString(chunks),
            selectedIdxStoreAtom: atom(0),
            onChangeItem,
            onChangeOrder,
            fromFile: editorData,
        };
        return ctx;
    }

    export function resetChunks(mFormCnt: MFormCnt, formIdx: FormIdx, get: Getter, set: Setter) {
        const chunks: ManualFieldState.Ctx[] = createManualAtoms(mFormCnt.fromFile, mFormCnt.onChangeItem);
        const initialChunks = ManualFieldConv.chunksToCompareString(chunks);
        set(mFormCnt.chunksAtom, chunks);
        mFormCnt.initialChunks = initialChunks;
    }

} //namespace ManualFieldsState

function createManualAtoms(initialState: EditorDataForOne[], onChange: OnChangeValueWithUpdateName): ManualFieldState.Ctx[] {
    const ctxs = initialState.map(
        (chunk, idx) => createManualAtom(chunk, onChange)
    );
    return ctxs;
}

function onChangeWithScope(mFormCnt: MFormCnt, updateName: string, nextValue: ManualFieldState.Ctx | ManualFieldState.Ctx[], { fileUsCtx, maniAtoms, get, set }: OnChangeProps) {
    const manualFormAtoms = maniAtoms[fileUsCtx.formIdx]!.manual;
    if (!manualFormAtoms) {
        return;
    }

    if (Array.isArray(nextValue)) {
        const chunks = get(manualFormAtoms.chunksAtom);
        const newChunksStr = ManualFieldConv.chunksToCompareString(chunks);
        const changed = newChunksStr !== manualFormAtoms.initialChunks;

        fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-manual-${updateName}`);
        // console.log(`on Change w/ scope form "${updateName}"`, { chg: [...fileUsCtx.fileUs.fileCnt.changesSet], mFormCnt, get, set, nextValue });
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
    // console.log(`on Change w/ scope item "${updateName}"`, { chg: [...fileUsCtx.fileUs.fileCnt.changesSet], mFormCnt, get, set, nextValue });
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
