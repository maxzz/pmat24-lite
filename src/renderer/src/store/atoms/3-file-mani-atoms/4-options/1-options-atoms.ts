import { Getter, Setter } from "jotai";
import { OnValueChange } from "@/util-hooks";
import { debounce } from "@/utils";
import { setManiChanges } from "../9-types";
import { CreateAtomsParams, ManiAtoms } from "../9-types";
import { RowInputState } from "./19-types";
import { OptionsConv } from "./0-conv";

export namespace OptionsState {

    export type Atoms = OptionsConv.FormOptionsAtoms;

    export function createAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms): Atoms {

        const onChange = (updateName: string): OnValueChange<RowInputState> => {
            return ({ get, set, nextValue }) => {
                debouncedCombinedResultFromAtoms(createAtomsParams, callbackAtoms, updateName, get, set, nextValue);
            };
        };

        const state = OptionsConv.forAtoms(createAtomsParams);
        const rv = OptionsConv.toAtoms(state, onChange);

        return rv;
    }

    export function combineOptionsFromAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, updateName: string, get: Getter, set: Setter, nextValue: RowInputState) {
        const atoms: Atoms = callbackAtoms[createAtomsParams.formIdx]!.optionsAtoms;

        if (nextValue.dirty) {
            const result = OptionsConv.fromAtoms(atoms, get, set) as any;
            delete result.fileUsAtom;
            console.log('PolicyEditor atoms', JSON.stringify(result, null, 4));
        }

        const changes = setManiChanges(createAtomsParams, nextValue.dirty, `${createAtomsParams.formIdx ? 'c' : 'l'}-o-${updateName}`);
        console.log('changes options:', [...changes.keys()]);

        // console.log('------------------', updateName);
        // console.log('         initValue', JSON.stringify(nextValue.initialData));
        // console.log('         nextValue', JSON.stringify(nextValue));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineOptionsFromAtoms);
}
