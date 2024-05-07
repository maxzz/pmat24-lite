import { Getter, Setter } from "jotai";
import { debounce } from "@/utils";
import { CreateAtomsParams, ManiAtoms, setManiChanges } from "../9-types";
import { OptionsConv } from "./0-conv";
import { OnValueChange } from "@/util-hooks";
import { RowInputState } from "@/components/2-main/2-right/2-file-mani/1-form-editor/4-options/4-controls";

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

        const changes = setManiChanges(callbackAtoms, nextValue.dirty, `${createAtomsParams.formIdx ? 'c' : 'l'}-o-${updateName}`);
        console.log('changes options:', [...changes.keys()]);

        // console.log('------------------', updateName);
        // console.log('         initValue', JSON.stringify(nextValue.initialData));
        // console.log('         nextValue', JSON.stringify(nextValue));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineOptionsFromAtoms);
}
