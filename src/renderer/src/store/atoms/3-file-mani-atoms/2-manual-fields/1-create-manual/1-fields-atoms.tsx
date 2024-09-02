import { atom, type Getter, type Setter } from "jotai";
import { atomWithCallback } from "@/util-hooks";
import { type FileUsCtx, type ManiAtoms } from "../../9-types";
import { type ManualFieldState, type ManualEditorState, ManualFieldConv } from "../0-conv";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { chunksToCompareString } from "../0-conv/4-comparison";

export namespace ManualFieldsState {

    export function createUiAtoms(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): ManualEditorState.ScriptAtoms {
        const { fileUs, formIdx } = fileUsCtx;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];

        const chunks = ManualFieldConv.forAtoms(fields);

        function onChangeItem(updateName: string) {
            function onChangeWName({ get, set }) {
                onChangeWithScope(ctx, updateName, get, set);
            };
            return onChangeWName;
        }

        function onChangeOrder({ get, set }) {
            onChangeWithScope(ctx, 'form', get, set);
        }

        const forAtoms: ManualFieldState.ForAtoms[] = ManualFieldConv.createAtoms(chunks, onChangeItem);

        const chunksAtom = atomWithCallback(forAtoms, onChangeOrder);

        const ctx: ManualEditorState.ScriptAtoms = {
            chunksAtom: chunksAtom,
            initialChunks: chunksToCompareString(forAtoms),
            selectedIdxStoreAtom: atom(0),
            onChangeItem,
            onChangeOrder,
        };

        return ctx;
    }
}

function onChangeWithScope(ctx: ManualEditorState.ScriptAtoms, updateName: string, get: Getter, set: Setter) {
    if (updateName === 'form') {
        console.log(`on Change w/ scope form "${updateName}"`, ctx, get, set);
        return;
    }
        
    console.log(`on Change w/ scope item "${updateName}"`, ctx, get, set);
}
