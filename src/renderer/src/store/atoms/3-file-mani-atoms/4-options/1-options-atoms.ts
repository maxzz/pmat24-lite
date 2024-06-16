import { Getter, Setter } from "jotai";
import { OnValueChange } from "@/util-hooks";
import { debounce } from "@/utils";
import { setManiChanges } from "../9-types";
import { FileUsParams, ManiAtoms } from "../9-types";
import { OptionsConv } from "./0-conv";
import { RowInputState } from "@/ui";

export namespace OptionsState {

    export type Atoms = OptionsConv.FormOptionsAtoms;

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

    export function combineOptionsFromAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms, updateName: string, get: Getter, set: Setter, nextValue: RowInputState) {
        const atoms: Atoms = maniAtoms[fileUsParams.formIdx]!.optionsAtoms;

        if (nextValue.dirty) {
            const result = OptionsConv.fromAtoms(atoms, get, set) as any;
            delete result.fileUsAtom;
            console.log('PolicyEditor atoms', JSON.stringify(result, null, 4));
        }

        const changes = setManiChanges(fileUsParams, nextValue.dirty, `${fileUsParams.formIdx ? 'c' : 'l'}-o-${updateName}`);
        console.log('changes options:', [...changes.keys()]);

        // console.log('------------------', updateName);
        // console.log('         initValue', JSON.stringify(nextValue.initialData));
        // console.log('         nextValue', JSON.stringify(nextValue));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineOptionsFromAtoms);
}
