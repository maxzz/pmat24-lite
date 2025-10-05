import { type RowInputState } from "@/ui";
import { type OnValueChange, debounce } from "@/utils";
import { type OnChangeProps, type FileUsCtx, safeManiAtomsFromFileUsCtx, fileUsChanges } from "../../9-types";
import { type FormOptionsState, FormOptionsConv } from "../2-conv-options";
import { updateAfterRegexUrlChangeAtom } from "./1-update-parts-of-murl";

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
    if (updateName === 'name') {
        set(fileUsCtx.fileUs.parsedSrc.stats.loginFormChooseNameAtom, nextValue.data);
    }

    const oFormCtx: OptionsState.Atoms | undefined = safeManiAtomsFromFileUsCtx(fileUsCtx, get)[fileUsCtx?.formIdx]?.options;
    if (!oFormCtx) {
        return;
    }

    if (updateName === 'regex_url') {
        set(updateAfterRegexUrlChangeAtom, { oFormCtx }); // This will update murl and trigger onChangeWithScope
        return;
    }

    fileUsChanges.set(fileUsCtx, nextValue.dirty, fileUsChanges.changeName(fileUsCtx.formIdx, 'o', updateName));

    //console.log(`%c-------- "${updateName}" %s`, 'color: darkgoldenrod; font-size: 0.6rem;', `nextValue ${JSON.stringify(nextValue)} fromFile ${JSON.stringify(oFormCtx.fromFileHOU)}`);
}
