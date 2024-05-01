import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { CreateAtomsParams, FormAtoms, ManiAtoms } from "../9-types";
import { FieldsState } from "../1-fields/1-fields-atoms";
import { SubmitState } from "../2-submit";
import { PolicyState } from "../3-policy";
import { OptionsState } from "../4-options";
import { proxy } from "valtio";

function createFormAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms): FormAtoms | undefined {

    const { fileUs, formIdx, changesAtom } = createAtomsParams;

    const metaForm = fileUs.meta?.[formIdx];
    if (!metaForm) {
        return;
    }

    const fieldsAtoms = FieldsState.createUiAtoms(createAtomsParams, callbackAtoms);

    const submitAtoms = SubmitState.createUiAtoms(createAtomsParams, callbackAtoms,
        ({ get, set }) => {
            SubmitState.debouncedCombinedResultFromAtoms(submitAtoms, changesAtom, get, set);
        }
    );

    const policyAtoms = PolicyState.createUiAtoms(createAtomsParams, callbackAtoms,
        ({ get, set }) => {
            PolicyState.debouncedCombinedResultFromAtoms(policyAtoms, changesAtom, get, set);
        }
    );

    const optionsAtoms = OptionsState.createAtoms(createAtomsParams, callbackAtoms,
        ({ get, set }) => {
            //console.log('options changed', field, field.mani.displayname);
            OptionsState.debouncedCombinedResultFromAtoms(optionsAtoms, changesAtom, get, set);
        }
    );

    const changes = proxy({
        fields: fieldsAtoms.map(() => false),
        submit: false,
        policy: false,
        options: false,
    });

    return {
        fieldsAtoms,
        submitAtoms,
        policyAtoms,
        optionsAtoms,

        params: createAtomsParams,
        changes,
    };
}

export function createManiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom): ManiAtoms {
    const rv: any = [];
    const callbackAtoms = rv as ManiAtoms;

    const changesAtom = fileUs.changesAtom;

    rv.push(createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.login, changesAtom }, callbackAtoms));
    rv.push(createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.cpass, changesAtom }, callbackAtoms));
    rv.push(changesAtom);

    return rv;
}

// export function createManiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom): ManiAtoms {

//     const changesAtom = atom(0);
//     const loginAtoms = createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.login, changesAtom });
//     const cpassAtoms = createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.cpass, changesAtom });

//     return [loginAtoms, cpassAtoms, changesAtom];
// }
