import { type RowInputState } from "@/ui/local-ui";
import { type OnValueChange, debounce } from "@/utils";
import { type OnChangeProps, type FileUsCtx, safeManiAtomsFromFileUsCtx, fileUsChanges } from "../../9-types";
import { type FormOptionsState, FormOptionsConv } from "../2-conv-options";
import { updateAfterRegexUrlChangeAtom } from "./1-update-parts-of-murl";

export namespace OptionsState {

    export type Atoms = FormOptionsState.AllAtoms;

    export function createAtoms(fileUsCtx: FileUsCtx): Atoms {

        function onChange(updateName: string): OnValueChange<RowInputState> {
            const debouncedOnChangeWithNameScope = debounce(onChangeWithScope);

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

    //printChanges(updateName, nextValue, oFormCtx);

    if (updateName === 'murl_regex') {
        set(updateAfterRegexUrlChangeAtom, { oFormCtx }); // This will update murl and trigger onChangeWithScope
    }

    if (updateName === 'murl') {
        //console.log('murl', JSON.stringify(nextValue));
        return;
    }

    fileUsChanges.set(fileUsCtx, nextValue.dirty, fileUsChanges.changeName(fileUsCtx.formIdx, 'o', updateName));
}

function printChanges(updateName: string, nextValue: RowInputState, oFormCtx: OptionsState.Atoms) {
    console.log(`%c💻🤔change: ${updateName}\n\t\t\t %cnextValue:%c%s\n\t\t\t %cfromFile:%c%s`,
        'color: darkgreen; font-size: 0.6rem;',
        'color: gray; font-size: 0.6rem;',
        'color: maroon; font-size: 0.6rem;',
        JSON.stringify(nextValue),
        'color: gray; font-size: 0.6rem;',
        'color: maroon; font-size: 0.6rem;',
        JSON.stringify(oFormCtx.fromFileHOU),
    );
}
