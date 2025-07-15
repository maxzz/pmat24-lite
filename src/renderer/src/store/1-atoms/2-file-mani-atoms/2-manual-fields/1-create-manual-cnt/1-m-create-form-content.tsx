import { type Getter, type Setter, atom } from "jotai";
import { atomWithCallback, debounce } from "@/utils";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { type EditorDataForOne, FormIdx, parseForEditor } from "@/store/manifest";
import { type MFormCnt, type FileUsCtx, type ManiAtoms, type OnChangeProps, fileUsChanges, safeByContext, safeManiAtomsFromFileUsCtx } from "../../9-types";
import { type ManualFieldState, ManualFieldConv } from "../2-conv";
import { NormalFieldConv } from "../../1-normal-fields";
import { createManualAtom } from "../2-conv/1-m-create-atoms";

export namespace ManualFieldsState {

    export function createManualFormCnt(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): MFormCnt {
        const { fileUs, formIdx } = fileUsCtx;

        const metaForm = safeByContext(fileUs?.parsedSrc?.meta)[formIdx]; // We are under createFormAtoms umbrella

        const fields = metaForm.fields || [];

        const editorData = parseForEditor(fields);

        function onChangeItem(updateName: string) {
            function onChangeWName({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx; }) {
                const onChangeProps: OnChangeProps = { fileUsCtx, get, set };

                //console.log(`createManualFormCnt.onChangeItem ${updateName}`, { nextValue });
                onChangeWithScopeDebounced(updateName, nextValue, { fileUsCtx, get, set });
            };
            return onChangeWName;
        }

        function onChangeOrder({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx[]; }) {
            onChangeWithScopeDebounced('order', nextValue, { fileUsCtx, get, set });
        }

        const chunks: ManualFieldState.Ctx[] = createManualAtoms(editorData, onChangeItem);

        const mFormCnt: MFormCnt = {
            chunksAtom: atomWithCallback(chunks, onChangeOrder),
            initialChunks: ManualFieldConv.chunksToCompareString(chunks),
            selectedIdxStoreAtom: atom(0),
            onChangeItem,
            onChangeOrder,
            fromFile: editorData,
        };
        return mFormCnt;
    }

    export function resetChunks(mFormCnt: MFormCnt, fileUsCtx: FileUsCtx, get: Getter, set: Setter) {
        const maniAtoms = safeByContext(get(fileUsCtx.fileUs.maniAtomsAtom));
        const onChangeProps: OnChangeProps = { fileUsCtx, get, set };

        const chunks: ManualFieldState.Ctx[] = createManualAtoms(mFormCnt.fromFile, mFormCnt.onChangeItem/*, onChangeProps*/);
        const initialChunks = ManualFieldConv.chunksToCompareString(chunks);
        set(mFormCnt.chunksAtom, chunks);
        mFormCnt.initialChunks = initialChunks;
    }

} //namespace ManualFieldsState

function createOnUpdateItemCb(onChange: OnChangeValueWithUpdateName, fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms) {
    function onChangeWName({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx; }) {
        const onChangeProps: OnChangeProps = { fileUsCtx, get, set };
        //onChangeWithScope(onChangeProps, nextValue);
    };
    return onChangeWName;
}

function createManualAtoms(initialState: EditorDataForOne[], onChange: OnChangeValueWithUpdateName/*, onChangeProps: OnChangeProps*/): ManualFieldState.Ctx[] {
    // If any two values can be changed in the same time, then we should not use shared debounced function (case: uuid change and any other change).
    const ctxs = initialState.map(
        (chunk, idx) => {
            //const onChangeProps: OnChangeProps = { fileUsCtx, get, set };

            // function onChangeItem(updateName: string) {
            //     function onChangeWName({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx; }) {
            //         //console.log(`createManualFormCnt.onChangeItem ${updateName}`, { nextValue });
            //         onChangeWithScopeDebounced(ctx, updateName, nextValue, { fileUsCtx, get, set });
            //     };
            //     return onChangeWName;
            // }

            return createManualAtom(chunk, onChange);
        }
    );
    return ctxs;
}

//type OnManualChangeItemProps = { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx | ManualFieldState.Ctx[]; };

function onChangeWithScope(updateName: string, nextValue: ManualFieldState.Ctx | ManualFieldState.Ctx[], { fileUsCtx, get, set }: OnChangeProps) {
    const maniFormCtx = safeManiAtomsFromFileUsCtx(fileUsCtx, get)[fileUsCtx?.formIdx]?.manual;
    if (!maniFormCtx) {
        return;
    }

    if (Array.isArray(nextValue)) { // called when chunks are reordered
        const chunks = get(maniFormCtx.chunksAtom);
        const newChunksStr = ManualFieldConv.chunksToCompareString(chunks);
        const changed = newChunksStr !== maniFormCtx.initialChunks;

        fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-manual-${updateName}`);
        // console.log(`on Change w/ scope form "${updateName}"`, { chg: [...fileUsCtx.fileUs.fileCnt.changesSet], get, set, nextValue });
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
    // console.log(`on Change w/ scope item "${updateName}"`, { chg: [...fileUsCtx.fileUs.fileCnt.changesSet], get, set, nextValue });
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
