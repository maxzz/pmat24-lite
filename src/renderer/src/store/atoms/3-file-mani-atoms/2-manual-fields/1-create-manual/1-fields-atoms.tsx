import { atom, type Getter, type Setter } from "jotai";
import { atomWithCallback } from "@/util-hooks";
import { type FileUsParams, type ManiAtoms } from "../../9-types";
import { type ManualFieldState, type ManualEditorState, ManualFieldConv } from "../0-conv";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { chunksToCompareString } from "../0-conv/4-comparison";

export namespace ManualFieldsState {

    export function createUiAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): ManualEditorState.ScriptAtoms {
        const { fileUs, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];

        const chunks = ManualFieldConv.forAtoms(fields);

        function onChangeWScope(ctx: ManualEditorState.ScriptAtoms, get: Getter, set: Setter) {
            console.log('on Change w/ scope', ctx, get, set);
        }

        function onChangeItem(updateName: string) {
            return function onChangeWName({ get, set }) {
                onChangeWScope(rv, get, set);
            };
        }

        function onChangeOrder({ get, set }) {
            console.log('onChange', rv);
        }

        const forAtoms: ManualFieldState.ForAtoms[] = ManualFieldConv.createAtoms(chunks, onChangeItem);

        const chunksAtom = atomWithCallback(forAtoms, onChangeOrder);

        const rv: ManualEditorState.ScriptAtoms = {
            chunksAtom: chunksAtom,
            initialChunks: chunksToCompareString(forAtoms),
            selectedIdxStoreAtom: atom(0),
            onChangeItem,
            onChangeOrder,
        };

        return rv;
    }
}
