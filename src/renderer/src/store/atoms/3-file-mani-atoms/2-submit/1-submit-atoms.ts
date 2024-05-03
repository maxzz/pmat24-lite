import { Getter, Setter } from "jotai";
import { OnValueChangeAny, atomWithCallback } from "@/util-hooks";
import { debounce } from "@/utils";
import { CreateAtomsParams, ManiAtoms } from "../9-types";
import { SubmitConv } from "./0-conv";

export namespace SubmitState {

    export type Atoms = SubmitConv.SubmitAtoms;

    export function createUiAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, onChange: OnValueChangeAny): Atoms {

        const { fileUs, fileUsAtom, formIdx } = createAtomsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const isWeb = !!metaForm?.mani.detection.web_ourl;

        // const metaForm = fileUs.meta?.[formIdx];
        // if (!metaForm) {
        //     return [];
        // }

        // const fields = metaForm.fields || [];
        // const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);



        // const metaForm = fileUs.meta?.[formIdx];
        // if (!metaForm) {
        //     return;
        // }

        return {
            doSubmitAtom: atomWithCallback(true, onChange),
        };
    }

    function combineResultFromAtoms(atoms: Atoms, get: Getter, set: Setter) {
        const result = {
            doSubmit: get(atoms.doSubmitAtom),
        };

        console.log('Submit atoms', JSON.stringify(result));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
