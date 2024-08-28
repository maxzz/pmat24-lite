import { atomWithCallback } from "@/util-hooks";
import { OnChangeValueWithPpdateName } from "@/ui/local-ui/1-input-validate";
import { type FileUsParams, type ManiAtoms } from "../9-types";
import { type ManualFieldState, ManualFieldConv } from "../2-manual-fields/0-conv";
import { chunksToString } from "./0-conv/4-comparison";

export namespace ManualFieldsState {

    export function createUiAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): ManualFieldState.ScriptAtoms {
        const { fileUs, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];

        const chunks = ManualFieldConv.forAtoms(fields);

        const onChangeItem: OnChangeValueWithPpdateName = (updateName: string) => {
            return (value: any) => {
                console.log('onChange', updateName, value);
            };
        };

        function onChangeOrder({ get, set }) {
            return (value: any) => {
                console.log('onChange', value);
            };
        }

        const forAtoms: ManualFieldState.ForAtoms[] = ManualFieldConv.createAtoms(chunks, onChangeItem);

        const chunksAtom = atomWithCallback(forAtoms, onChangeOrder);

        const rv: ManualFieldState.ScriptAtoms = {
            chunks: chunksAtom,
            initialChunks: chunksToString(forAtoms),
        };

        return rv;
    }
}
