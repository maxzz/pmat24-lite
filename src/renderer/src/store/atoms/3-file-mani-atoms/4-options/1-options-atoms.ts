import { type OnValueChange } from "@/util-hooks";
import { type OnChangeProps, type FileUsCtx, type ManiAtoms } from "../9-types";
import { type ManiOptions, OptionsConv } from "./0-conv";
import { type RowInputState } from "@/ui";
import { setManiChanges } from "../9-types";
import { debounce } from "@/utils";

export namespace OptionsState {

    export type Atoms = ManiOptions.FormOptionsAtoms;

    export function createAtoms(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): Atoms {

        const onChange = (updateName: string): OnValueChange<RowInputState> => {
            return ({ get, set, nextValue }) => {
                onChangeWithScopeDebounced(updateName, nextValue, {fileUsCtx, maniAtoms, get, set});
            };
        };

        const state = OptionsConv.forAtoms(fileUsCtx);
        const rv = OptionsConv.createAtoms(state, onChange);

        return rv;
    }
}

function onChangeWithScope(updateName: string, nextValue: RowInputState, {fileUsCtx, maniAtoms, get, set}: OnChangeProps) {
    const optionsAtoms: OptionsState.Atoms = maniAtoms[fileUsCtx.formIdx]!.options;

    // if (nextValue.dirty) {
    //     const fromUi = OptionsConv.fromAtoms(optionsAtoms, get, set);
    //     console.log('PolicyEditor atoms', JSON.stringify(fromUi, null, 4));
    // }
    
    if (updateName === 'name') {
        set(fileUsCtx.fileUs.stats.loginFormChooseNameAtom, nextValue.data);
    }

    setManiChanges(fileUsCtx, nextValue.dirty, `${fileUsCtx.formIdx ? 'c' : 'l'}-o-${updateName}`);

    // console.log('------------------', updateName);
    // console.log('         initValue', JSON.stringify(nextValue.initialData));
    // console.log('         nextValue', JSON.stringify(nextValue));
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
