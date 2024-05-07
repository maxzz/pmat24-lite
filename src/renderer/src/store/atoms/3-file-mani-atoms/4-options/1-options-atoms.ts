import { Getter, Setter } from "jotai";
import { debounce } from "@/utils";
import { CreateAtomsParams, ManiAtoms } from "../9-types";
import { OptionsConv } from "./0-conv";
import { OnValueChange } from "@/util-hooks";

export namespace OptionsState {

    export type Atoms = OptionsConv.FormOptionsAtoms;

    export function createAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms): Atoms {

        const onChange = (updateName: string): OnValueChange<string> => {
            return ({ get, set, nextValue }) => {
                debouncedCombinedResultFromAtoms(createAtomsParams, callbackAtoms, updateName, get, set, nextValue);
            };
        };

        const state = OptionsConv.forAtoms(createAtomsParams);
        const rv = OptionsConv.toAtoms(state, onChange);

        return rv;
    }

    export function combineOptionsFromAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, updateName: string, get: Getter, set: Setter, nextValue: string) {
        const atoms: Atoms = callbackAtoms[createAtomsParams.formIdx]!.optionsAtoms;

        const result = OptionsConv.fromAtoms(atoms, get, set);
        console.log('PolicyEditor atoms', JSON.stringify(result, null, 4));
        console.log('         nextValue', JSON.stringify(nextValue));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineOptionsFromAtoms);
}
