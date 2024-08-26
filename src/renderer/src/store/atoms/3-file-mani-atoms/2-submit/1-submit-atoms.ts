import { type Getter, type Setter } from "jotai";
import { setManiChanges, type FileUsParams, type ManiAtoms } from "../9-types";
import { SubmitConv, type SubmitConvTypes } from "./0-conv";
import { debounce } from "@/utils";

export namespace SubmitState {

    export type Atoms = SubmitConvTypes.SubmitAtoms;

    export function createUiAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): Atoms {

        const { fileUs, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
        const isWeb = !!metaForm?.mani.detection.web_ourl;
        const forAtoms = SubmitConv.forAtoms(metaForm)

        const onChange = ({ get, set }) => {
            debouncedCombinedResultFromAtoms(fileUsParams, maniAtoms, get, set);
        }

        const rv: Atoms = {
            ...(SubmitConv.createAtoms(forAtoms, onChange)),
            isWeb,
            metaForm,
            fromFile: forAtoms,
            changed: false,
        };

        return rv;
    }

    function combineResultFromAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms, get: Getter, set: Setter) {
        const nomalFormAtoms = maniAtoms[fileUsParams.formIdx]!.normal;
        if (!nomalFormAtoms) {
            return;
        }

        const atoms: Atoms = nomalFormAtoms.submitAtoms;

        const state = SubmitConv.fromAtoms(atoms, get, set);
        const changed = !SubmitConv.areTheSame(state, atoms.fromFile);
        atoms.changed = changed;

        const changes = setManiChanges(fileUsParams, changed, `${fileUsParams.formIdx?'c':'l'}-submit`);

        console.log('changes submit:', [...changes.keys()]);
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
