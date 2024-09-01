import { atom } from "jotai";
import { atomWithCallback } from "@/util-hooks";
import { type FileUsParams, type ManiAtoms } from "../../9-types";
import { type ManualFieldState, type ManualEditorState, ManualFieldConv } from "../0-conv";
import { chunksToCompareString } from "../0-conv/4-comparison";

export namespace ManualFieldsState {

    export function createUiAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): ManualEditorState.ScriptAtoms {
        const { fileUs, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];

        const chunks = ManualFieldConv.forAtoms(fields);

        function onChangeItem(updateName: string) {
            function fn(value: any) {
                console.log('onChange', updateName, value);
            }
            return fn;
        }

        // const onChange = (updateName: string) => {
        //     return ({ get, set, nextValue }: OnValueChangeParams<any>) => {
        //         console.log('TODO: doCreateItemAtom.onChange', updateName);
        //     }
        // }

        function onChangeOrder({ get, set }) {
            function fn(value: any) {
                console.log('onChange', value);
            }
            return fn;
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

// ./6-do-create-item.ts
// TODO: make doCreateItemAtom.onChange real

// ./a-create-script-item.ts
// pidx: 0, //TODO: initiate with correct value
// ridx: 0, //TODO: initiate with correct value

// ./1-fields-atoms.tsx
//TOOD: onChangeItem and onChangeOrder