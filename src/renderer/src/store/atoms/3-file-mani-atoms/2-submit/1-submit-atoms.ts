import { Getter, Setter } from "jotai";
import { atomWithCallback } from "@/util-hooks";
import { debounce } from "@/utils";
import { CreateAtomsParams, ManiAtoms } from "../9-types";
import { SubmitConv } from "./0-conv";

export namespace SubmitState {

    export type Atoms = SubmitConv.SubmitAtoms;

    export function createUiAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms): Atoms {

        const { fileUs, fileUsAtom, formIdx } = createAtomsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const isWeb = !!metaForm?.mani.detection.web_ourl;

        const onChange = ({ get, set }) => {
            const atoms: Atoms = callbackAtoms[createAtomsParams.formIdx]!.submitAtoms;
            console.log('--------', atoms);
            debouncedCombinedResultFromAtoms(atoms, get, set);
        }

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
