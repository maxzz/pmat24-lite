import { Getter, Setter } from "jotai";
import { CreateAtomsParams, ManiAtoms, setManiChanges } from "../9-types";
import { debounce } from "@/utils";
import { SubmitConv } from "./0-conv";

export namespace SubmitState {

    export type Atoms = SubmitConv.SubmitAtoms;

    export function createUiAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms): Atoms {

        const { fileUs, fileUsAtom, formIdx } = createAtomsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
        const isWeb = !!metaForm?.mani.detection.web_ourl;
        const forAtoms = SubmitConv.forAtoms(metaForm)

        const onChange = ({ get, set }) => {
            debouncedCombinedResultFromAtoms(createAtomsParams, callbackAtoms, get, set);
        }

        const rv: Atoms = {
            ...(SubmitConv.toAtoms(forAtoms, onChange)),
            isWeb,
            fromFile: forAtoms,
            changed: false,
        };

        return rv;
    }

    function combineResultFromAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, get: Getter, set: Setter) {
        const atoms: Atoms = callbackAtoms[createAtomsParams.formIdx]!.submitAtoms;

        const state = SubmitConv.fromAtoms(atoms, get, set);
        const changed = !SubmitConv.areTheSame(state, atoms.fromFile);
        atoms.changed = changed;

        const changes = setManiChanges(callbackAtoms, changed, `${createAtomsParams.formIdx?'c':'l'}-submit`);

        console.log('changes submit:', [...changes.keys()]);
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
