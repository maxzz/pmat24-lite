import { atom, type Getter, type Setter } from "jotai";
import { atomWithCallback, debounce } from "@/utils";
import { parseForEditor } from "@/store/manifest";
import { type MFormCtx, type FileUsCtx, type ManiAtoms, type OnChangeProps, fileUsChanges } from "../../9-types";
import { type ManualFieldState, ManualFieldConv } from "../0-conv";
import { NormalFieldConv } from "../../1-normal-fields";
import { areTheSame, chunksToCompareString } from "../0-conv/4-comparison";
import { isChunkInvalid } from "../0-conv/6-verify";

export namespace ManualFieldsState {

    export function createFormCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): MFormCtx {
        const { fileUs, formIdx } = fileUsCtx;

        const metaForm = fileUs.parsedSrc.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];

        const editorData = parseForEditor(fields);

        function onChangeItem(updateName: string) {
            function onChangeWName({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx; }) {
                onChangeWithScopeDebounced(ctx, updateName, nextValue, { fileUsCtx, maniAtoms, get, set });
            };
            return onChangeWName;
        }

        function onChangeOrder({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.Ctx[]; }) {
            onChangeWithScopeDebounced(ctx, 'order', nextValue, { fileUsCtx, maniAtoms, get, set });
        }

        const chunks: ManualFieldState.Ctx[] = ManualFieldConv.createAtoms(editorData, onChangeItem);

        const ctx: MFormCtx = {
            chunksAtom: atomWithCallback(chunks, onChangeOrder),
            initialChunks: chunksToCompareString(chunks),
            selectedIdxStoreAtom: atom(0),
            onChangeItem,
            onChangeOrder,
            fromFile: editorData,
        };
        return ctx;
    }

    export function resetChunks(ctx: MFormCtx, get: Getter, set: Setter) {
        const chunks: ManualFieldState.Ctx[] = ManualFieldConv.createAtoms(ctx.fromFile, ctx.onChangeItem);
        const initialChunks = chunksToCompareString(chunks);
        set(ctx.chunksAtom, chunks);
        ctx.initialChunks = initialChunks;
    }
}

function onChangeWithScope(ctx: MFormCtx, updateName: string, nextValue: ManualFieldState.Ctx | ManualFieldState.Ctx[], { fileUsCtx, maniAtoms, get, set }: OnChangeProps) {
    const manualFormAtoms = maniAtoms[fileUsCtx.formIdx]!.manual;
    if (!manualFormAtoms) {
        return;
    }

    if (Array.isArray(nextValue)) {
        const chunks = get(manualFormAtoms.chunksAtom);
        const newChunksStr = chunksToCompareString(chunks);
        const changed = newChunksStr !== manualFormAtoms.initialChunks;

        fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-manual-${updateName}`);
        // console.log(`on Change w/ scope form "${updateName}"`, { chg: [...fileUsCtx.fileUs.changesSet], ctx, get, set, nextValue });
        return;
    }

    let changed: boolean | undefined;

    if (nextValue.type === 'fld') {
        const fromUi = NormalFieldConv.fromAtoms(nextValue.rowCtx, get, set);
        changed = !NormalFieldConv.areTheSame(fromUi, nextValue.rowCtx.fromFile);
    } else {
        const fromUi = ManualFieldConv.fromAtom(nextValue, get);
        changed = !areTheSame(fromUi, nextValue.original);

        set(nextValue.hasErrorAtom, isChunkInvalid(nextValue, get, set));
    }

    fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-manual-${updateName}`);
    // console.log(`on Change w/ scope item "${updateName}"`, { chg: [...fileUsCtx.fileUs.changesSet], ctx, get, set, nextValue });
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
