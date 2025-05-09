import { type OnChangeProps, type FileUsCtx, type ManiAtoms } from "../9-types";
import { type FormOptionsState, FormOptionsConv } from "./0-conv";
import { type RowInputState } from "@/ui";
import { type OnValueChange, debounce } from "@/utils";
import { fileUsChanges } from "../9-types";

export namespace OptionsState {

    export type Atoms = FormOptionsState.AllAtoms;

    export function createAtoms(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): Atoms {

        const onChange = (updateName: string): OnValueChange<RowInputState> => {
            return ({ get, set, nextValue }) => {
                onChangeWithScopeDebounced(updateName, nextValue, { fileUsCtx, maniAtoms, get, set });
            };
        };

        const state = FormOptionsConv.forAtoms(fileUsCtx);
        const rv = FormOptionsConv.createAtoms(state, onChange);

        return rv;
    }
}

function onChangeWithScope(updateName: string, nextValue: RowInputState, { fileUsCtx, maniAtoms, get, set }: OnChangeProps) {
    // const optionsAtoms: OptionsState.Atoms | undefined = maniAtoms[fileUsCtx.formIdx]?.options; // can be undefined after reset
    // if (nextValue.dirty && optionsAtoms) {
    //     const fromUi = OptionsConv.fromAtoms(optionsAtoms, get, set);
    //     console.log('PolicyEditor atoms', JSON.stringify(fromUi, null, 4));
    // }

    if (updateName === 'name') {
        set(fileUsCtx.fileUs.parsedSrc.stats.loginFormChooseNameAtom, nextValue.data);
    }

    fileUsChanges.set(fileUsCtx, nextValue.dirty, `${fileUsCtx.formIdx ? 'c' : 'l'}-o-${updateName}`);

    //console.log(`%c-------- "${updateName}" %s`, 'color: darkgoldenrod; font-size: 0.6rem;', `nextValue ${JSON.stringify(nextValue)}`);
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
