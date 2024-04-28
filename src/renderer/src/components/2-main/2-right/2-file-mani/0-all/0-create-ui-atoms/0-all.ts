import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { FormAtoms, ManiAtoms } from "./9-types";
import { FieldsState } from "./1-fields/1-fields-atoms";
import { SubmitState } from "./2-submit";
import { PolicyState } from "./3-policy";
import { OptionsState } from "./4-options";

function createFormAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom, formIdx: FormIdx): FormAtoms | undefined {

    const metaForm = fileUs.meta?.[formIdx];
    if (!metaForm) {
        return;
    }

    const fieldsAtoms = FieldsState.createUiAtoms(fileUs, fileUsAtom, formIdx);

    const submitAtoms = SubmitState.createUiAtoms(metaForm,
        ({ get, set }) => {
            SubmitState.debouncedCombinedResultFromAtoms(submitAtoms, get, set);
        }
    );

    const policyAtoms = PolicyState.createUiAtoms(metaForm,
        ({ get, set }) => {
            PolicyState.debouncedCombinedResultFromAtoms(policyAtoms, get, set);
        }
    );

    const optionsAtoms = OptionsState.createAtoms(fileUs, fileUsAtom, formIdx,
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

        fileUsAtom,
        formIdx,
    };
}

export function createManiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom): ManiAtoms {

    const loginAtoms = createFormAtoms(fileUs, fileUsAtom, FormIdx.login);
    const cpassAtoms = createFormAtoms(fileUs, fileUsAtom, FormIdx.cpass);

    return [loginAtoms, cpassAtoms];
}
