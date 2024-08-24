import { type Getter, type Setter } from "jotai";
import { type OnValueChange } from "@/util-hooks";
import { type FileUsParams, type ManiAtoms } from "../9-types";
import { type ManiOptions, OptionsConv } from "./0-conv";
import { type RowInputState } from "@/ui";
import { debounce } from "@/utils";
import { setManiChanges } from "../9-types";

export namespace OptionsState {

    export type Atoms = ManiOptions.FormOptionsAtoms;

    export function createAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): Atoms {

        const onChange = (updateName: string): OnValueChange<RowInputState> => {
            return ({ get, set, nextValue }) => {
                debouncedCombinedResultFromAtoms(fileUsParams, maniAtoms, updateName, get, set, nextValue);
            };
        };

        const state = OptionsConv.forAtoms(fileUsParams);
        const rv = OptionsConv.createAtoms(state, onChange);

        return rv;
    }
}

const debouncedCombinedResultFromAtoms = debounce(combineOptionsFromAtoms);

function combineOptionsFromAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms, updateName: string, get: Getter, set: Setter, nextValue: RowInputState) {
    const optionsAtoms: OptionsState.Atoms = maniAtoms[fileUsParams.formIdx]!.optionsAtoms;

    if (nextValue.dirty) {
        const result = OptionsConv.fromAtoms(optionsAtoms, get, set);
        console.log('PolicyEditor atoms', JSON.stringify(result, null, 4));
    }

    const changes = setManiChanges(fileUsParams, nextValue.dirty, `${fileUsParams.formIdx ? 'c' : 'l'}-o-${updateName}`);
    console.log('changes options:', [...changes.keys()]);

    // console.log('------------------', updateName);
    // console.log('         initValue', JSON.stringify(nextValue.initialData));
    // console.log('         nextValue', JSON.stringify(nextValue));
}
