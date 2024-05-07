import { Getter, Setter } from "jotai";
import { debounce } from "@/utils";
import { CreateAtomsParams, ManiAtoms } from "../9-types";
import { OptionsConv } from "./0-conv";

export namespace OptionsState {

    export type Atoms = OptionsConv.FormOptionsAtoms;

    export function createAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms): Atoms {

        const onChange = (updateName: string) => {
            return ({ get, set }) => {
                debouncedCombinedResultFromAtoms(createAtomsParams, callbackAtoms, updateName, get, set);
            };
        }

        const state = OptionsConv.forAtoms(createAtomsParams);
        const rv = OptionsConv.toAtoms(state, onChange);

        return rv;
    }

    export function combineOptionsFromAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, updateName: string, get: Getter, set: Setter) {
        const atoms: Atoms = callbackAtoms[createAtomsParams.formIdx]!.optionsAtoms;

        const result = OptionsConv.fromAtoms(atoms, get, set);

        console.log('PolicyEditor atoms', JSON.stringify(result, null, 4));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineOptionsFromAtoms);
}
