import { type RowInputState } from "@/ui";
import { type OnValueChange, debounce } from "@/utils";
import { type OnChangeProps, type FileUsCtx, safeManiAtomsFromFileUsCtx, fileUsChanges } from "../../9-types";
import { type FormOptionsState, FormOptionsConv } from "../2-conv-options";

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

    const changeName = fileUsChanges.changeName(fileUsCtx.formIdx, 'o', updateName);
    const fromFile = oFormCtx.fromFileHOU;

    console.log('🎆onChangeWithScope:', updateName, nextValue.data, JSON.stringify(fromFile));

    if (updateName === 'rurl') { // This is murl input
        const changed = nextValue.data !== fromFile.url;
        fileUsChanges.set(fileUsCtx, changed, changeName);
        //console.log('rurl', nextValue.data); // rurl will update murl
        return;
    }

    if (updateName === 'murl') { // This is case when we change how to match URL dropdown
        const how = get(oFormCtx.howAtom);
        if (how === fromFile.how) {
            const changed = nextValue.data !== fromFile.url;
            fileUsChanges.set(fileUsCtx, changed, changeName);
            return;
        }
    }

    fileUsChanges.set(fileUsCtx, nextValue.dirty, changeName);

    //console.log(`%c-------- "${updateName}" %s`, 'color: darkgoldenrod; font-size: 0.6rem;', `nextValue ${JSON.stringify(nextValue)}`);
}
