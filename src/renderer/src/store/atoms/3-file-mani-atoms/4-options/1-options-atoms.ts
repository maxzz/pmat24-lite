import { type Getter, type Setter } from "jotai";
import { type OnValueChange } from "@/util-hooks";
import { type FileUsCtx, type ManiAtoms } from "../9-types";
import { type ManiOptions, OptionsConv } from "./0-conv";
import { type RowInputState } from "@/ui";
import { setManiChanges } from "../9-types";
import { debounce } from "@/utils";

export namespace OptionsState {

    export type Atoms = ManiOptions.FormOptionsAtoms;

    export function createAtoms(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): Atoms {

        const onChange = (updateName: string): OnValueChange<RowInputState> => {
            return ({ get, set, nextValue }) => {
                onChangeWithScopeDebounced(fileUsCtx, maniAtoms, updateName, get, set, nextValue);
            };
        };

        const state = OptionsConv.forAtoms(fileUsCtx);
        const rv = OptionsConv.createAtoms(state, onChange);

        return rv;
    }
}

function onChangeWithScope(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms, updateName: string, get: Getter, set: Setter, nextValue: RowInputState) {
    const optionsAtoms: OptionsState.Atoms = maniAtoms[fileUsCtx.formIdx]!.options;

    if (nextValue.dirty) {
        const result = OptionsConv.fromAtoms(optionsAtoms, get, set);
        console.log('PolicyEditor atoms', JSON.stringify(result, null, 4));
    }

    const changes = setManiChanges(fileUsCtx, nextValue.dirty, `${fileUsCtx.formIdx ? 'c' : 'l'}-o-${updateName}`);
    console.log('changes options:', [...changes.keys()]);

    // console.log('------------------', updateName);
    // console.log('         initValue', JSON.stringify(nextValue.initialData));
    // console.log('         nextValue', JSON.stringify(nextValue));
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
