import { Getter, Setter } from "jotai";
import { atomWithCallback } from "@/util-hooks";
import { debounce } from "@/utils";
import { CreateAtomsParams, ManiAtoms } from "../9-types";
import { SubmitConv } from "./0-conv";
import { getSubmitChoices } from "./9-submit-choices";

export namespace SubmitState {

    export type Atoms = SubmitConv.SubmitAtoms;

    export function createUiAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms): Atoms {

        const { fileUs, fileUsAtom, formIdx } = createAtomsParams;
        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
        const isWeb = !!metaForm?.mani.detection.web_ourl;
        const { buttonNames, initialSelected } = getSubmitChoices(metaForm);

        const onChange = ({ get, set }) => {
            debouncedCombinedResultFromAtoms(createAtomsParams, callbackAtoms, get, set);
        }

        const rv: Atoms = {
            buttonNamesAtom: atomWithCallback(buttonNames, onChange),
            selectedAtom: atomWithCallback(initialSelected, onChange),
            doSubmitAtom: atomWithCallback(true, onChange),
            isWeb,
        };

        return rv;
    }

    function combineResultFromAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, get: Getter, set: Setter) {
        const atoms: Atoms = callbackAtoms[createAtomsParams.formIdx]!.submitAtoms;

        const result = {
            buttonNames: get(atoms.buttonNamesAtom),
            selected: get(atoms.selectedAtom),
            doSubmit: get(atoms.doSubmitAtom),
        };

        console.log('Submit atoms', JSON.stringify(result));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
