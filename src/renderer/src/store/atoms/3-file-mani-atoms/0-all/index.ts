import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { CreateAtomsParams, FormAtoms, ManiAtoms, ManiChangesAtom } from "../9-types";
import { FieldsState } from "../1-fields/1-fields-atoms";
import { SubmitState } from "../2-submit";
import { PolicyState } from "../3-policy";
import { OptionsState } from "../4-options";
import { atom } from "jotai";

function createFormAtoms(createAtomsParams: CreateAtomsParams): FormAtoms | undefined {

    const metaForm = createAtomsParams.fileUs.meta?.[createAtomsParams.formIdx];
    if (!metaForm) {
        return;
    }

    const fieldsAtoms = FieldsState.createUiAtoms(createAtomsParams);

    const submitAtoms = SubmitState.createUiAtoms(createAtomsParams,
        ({ get, set }) => {
            SubmitState.debouncedCombinedResultFromAtoms(submitAtoms, get, set);
        }
    );

    const policyAtoms = PolicyState.createUiAtoms(createAtomsParams,
        ({ get, set }) => {
            PolicyState.debouncedCombinedResultFromAtoms(policyAtoms, get, set);
        }
    );

    const optionsAtoms = OptionsState.createAtoms(createAtomsParams,
        ({ get, set }) => {
            //console.log('options changed', field, field.mani.displayname);
            OptionsState.debouncedCombinedResultFromAtoms(optionsAtoms, get, set);
        }
    );

    return {
        fieldsAtoms,
        submitAtoms,
        policyAtoms,
        optionsAtoms,

        params: createAtomsParams,
    };
}

export function createManiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom): ManiAtoms {

    const changesAtom = atom(0);
    const loginAtoms = createFormAtoms({fileUs, fileUsAtom, formIdx: FormIdx.login, changesAtom});
    const cpassAtoms = createFormAtoms({fileUs, fileUsAtom, formIdx: FormIdx.cpass, changesAtom});

    return [loginAtoms, cpassAtoms, changesAtom];
}
