import { type OnChangeProps, type FileUsCtx, type ManiAtoms, safeManiAtomsFromFileUsCtx } from "../../9-types";
import { type FormOptionsState, FormOptionsConv } from "../2-conv-options";
import { type RowInputState } from "@/ui";
import { type OnValueChange, debounce } from "@/utils";
import { Matching } from "pm-manifest";
import { fileUsChanges } from "../../9-types";

export namespace OptionsState {

    export type Atoms = FormOptionsState.AllAtoms;

    export function createAtoms(fileUsCtx: FileUsCtx): Atoms {

        const debouncedOnChangeWithNameScope = debounce(onChangeWithScope);

        function onChange(updateName: string): OnValueChange<RowInputState> {
            return function OnChangeWithNameScope({ get, set, nextValue }) {
                debouncedOnChangeWithNameScope(updateName, nextValue, { fileUsCtx, get, set });
            };
        }

        const initialState = FormOptionsConv.forAtoms(fileUsCtx);
        const rv = FormOptionsConv.createAtoms(initialState, onChange);

        return rv;
    }
}

function onChangeWithScope(updateName: string, nextValue: RowInputState, { fileUsCtx, get, set }: OnChangeProps) {
    // const oFormCtx: OptionsState.Atoms | undefined = safeManiAtomsFromFileUsCtx(fileUsCtx, get)[fileUsCtx?.formIdx]?.options; // can be undefined after reset
    // if (nextValue.dirty && oFormCtx) {
    //     const fromUi = OptionsConv.fromAtoms(oFormCtx, get, set);
    //     console.log('PolicyEditor atoms', JSON.stringify(fromUi, null, 4));
    // }

    if (updateName === 'name') {
        set(fileUsCtx.fileUs.parsedSrc.stats.loginFormChooseNameAtom, nextValue.data);
    }

    if (updateName === 'rurl') {
        console.log('rurl', nextValue.data); // rurl will update murl
        return;
    }

    if (updateName === 'murl') {
        const oFormCtx: OptionsState.Atoms | undefined = safeManiAtomsFromFileUsCtx(fileUsCtx, get)[fileUsCtx?.formIdx]?.options; // can be undefined after reset
        if (oFormCtx) {
            const how = get(oFormCtx.howAtom);
            const fromFile = oFormCtx.fromFileHOU;
            if (how === fromFile.how && nextValue.data === fromFile.url) {
                fileUsChanges.set(fileUsCtx, false, `${fileUsCtx.formIdx ? 'c' : 'l'}-o-${updateName}`);
                return;
            }
        }
    }

    fileUsChanges.set(fileUsCtx, nextValue.dirty, `${fileUsCtx.formIdx ? 'c' : 'l'}-o-${updateName}`);

    //console.log(`%c-------- "${updateName}" %s`, 'color: darkgoldenrod; font-size: 0.6rem;', `nextValue ${JSON.stringify(nextValue)}`);
}
