import { atom } from "jotai";
import { OnChangeValueWithPpdateName } from "@/ui/local-ui/1-input-validate";
import { type FileUsParams, type ManiAtoms } from "../../9-types";
import { type ManualField, ManualFieldConv } from "./0-conv";

export namespace ManualFieldsState {

    export function createUiAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): ManualField.ScriptAtoms {
        const { fileUs, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];

        const chunks = ManualFieldConv.forAtoms(fields);

        const onChange: OnChangeValueWithPpdateName = (updateName: string) => {
            return (value: any) => {
                console.log('onChange', updateName, value);
            };
        };

        const forAtoms = ManualFieldConv.createAtoms(chunks, onChange);

        const rv = atom(forAtoms)

        return rv;
    }

}
