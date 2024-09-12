import { atom, type Getter, type Setter } from "jotai";
import { type MFormCtx, type FileUsCtx, type ManiAtoms, type OnChangeProps, setManiChanges } from "../../9-types";
import { type ManualFieldState, ManualFieldConv } from "../0-conv";
import { areTheSame, chunksToCompareString } from "../0-conv/4-comparison";
import { NormalFieldConv } from "../../1-normal-fields";
import { atomWithCallback } from "@/util-hooks";
import { debounce } from "@/utils";
import { isChunkInvalid } from "../0-conv/6-verify";

export namespace ManualFieldsState {

    export function createFormCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): MFormCtx {
        const { fileUs, formIdx } = fileUsCtx;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];

        const chunks = ManualFieldConv.forAtoms(fields);

        function onChangeItem(updateName: string) {
            function onChangeWName({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.ForAtoms }) {
                onChangeWithScopeDebounced(ctx, updateName, nextValue, { fileUsCtx, maniAtoms, get, set });
            };
            return onChangeWName;
        }

        function onChangeOrder({ get, set, nextValue }: { get: Getter, set: Setter, nextValue: ManualFieldState.ForAtoms[] }) {
            onChangeWithScopeDebounced(ctx, 'order', nextValue, { fileUsCtx, maniAtoms, get, set });
        }

        const forAtoms: ManualFieldState.ForAtoms[] = ManualFieldConv.createAtoms(chunks, onChangeItem);

        const chunksAtom = atomWithCallback(forAtoms, onChangeOrder);

        const ctx: MFormCtx = {
            chunksAtom: chunksAtom,
            initialChunks: chunksToCompareString(forAtoms),
            selectedIdxStoreAtom: atom(0),
            onChangeItem,
            onChangeOrder,
        };

        return ctx;
    }
}

function onChangeWithScope(ctx: MFormCtx, updateName: string, nextValue: ManualFieldState.ForAtoms | ManualFieldState.ForAtoms[], { fileUsCtx, maniAtoms, get, set }: OnChangeProps) {
    const manualFormAtoms = maniAtoms[fileUsCtx.formIdx]!.manual;
    if (!manualFormAtoms) {
        return;
    }

    if (Array.isArray(nextValue)) {
        const chunks = get(manualFormAtoms.chunksAtom);
        const newChunksStr = chunksToCompareString(chunks);
        const changed = newChunksStr !== manualFormAtoms.initialChunks;

        setManiChanges(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-manual-${updateName}`);
        // console.log(`on Change w/ scope form "${updateName}"`, { chg: [...fileUsCtx.fileUs.changesSet], ctx, get, set, nextValue });
        return;
    }

    let changed: boolean | undefined;

    if (nextValue.type === 'fld') {
        const fromUi = NormalFieldConv.fromAtoms(nextValue.field, get, set);
        changed = !NormalFieldConv.areTheSame(fromUi, nextValue.field.fromFile);
    } else {
        const fromUi = ManualFieldConv.fromAtom(nextValue, get);
        changed = !areTheSame(fromUi, nextValue.original);

        set(nextValue.hasErrorAtom, isChunkInvalid(nextValue, get, set));
    }

    setManiChanges(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-manual-${updateName}`);
    // console.log(`on Change w/ scope item "${updateName}"`, { chg: [...fileUsCtx.fileUs.changesSet], ctx, get, set, nextValue });
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
