import { atom, type Getter, type Setter } from "jotai";
import { type MFormCtx, type FileUsCtx, type ManiAtoms, type OnChangeProps, setManiChanges } from "../../9-types";
import { type ManualFieldState, ManualFieldConv } from "../0-conv";
import { areTheSame, chunksToCompareString } from "../0-conv/4-comparison";
import { NormalFieldConv } from "../../1-normal-fields";
import { atomWithCallback } from "@/util-hooks";
import { debounce } from "@/utils";

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

        console.log(`on Change w/ scope form "${updateName}"`, { chg: fileUsCtx.fileUs.changesSet, ctx, get, set, nextValue });
        return;
    }

    // const atoms: NormalField.FieldAtoms = nomalFormAtoms.fieldsAtoms[fieldIdx];

    if (nextValue.type === 'fld') {
        const fromFile = nextValue.field.fromFile;
        const fromUi = NormalFieldConv.fromAtoms(nextValue.field, get, set);

        const changed = !NormalFieldConv.areTheSame(fromUi, fromFile);

        setManiChanges(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-manual-${updateName}`);

        console.log(`on Change w/ scope item "${updateName}"`, { chg: fileUsCtx.fileUs.changesSet, ctx, get, set, nextValue });
        return;
    } else {
        const fromUi = ManualFieldConv.fromAtom(nextValue, get);
        const changed = !areTheSame(fromUi, nextValue.original);

        setManiChanges(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-manual-${updateName}`);

        console.log(`on Change w/ scope item "${updateName}"`, { chg: fileUsCtx.fileUs.changesSet, ctx, get, set, nextValue });
        return;
    }
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
