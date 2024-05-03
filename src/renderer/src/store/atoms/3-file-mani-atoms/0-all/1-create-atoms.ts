import { proxy } from "valtio";
import { proxySet } from "valtio/utils";
import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { CreateAtomsParams, FormAtoms, ManiAtoms } from "../9-types";
import { FieldsState } from "../1-fields/1-fields-atoms";
import { SubmitState } from "../2-submit";
import { PolicyState } from "../3-policy";
import { OptionsState } from "../4-options";

function createFormAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms): FormAtoms | undefined {

    const { fileUs, formIdx } = createAtomsParams;

    const metaForm = fileUs.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return;
    }

    const fieldsAtoms = FieldsState.createUiAtoms(createAtomsParams, callbackAtoms);
    const submitAtoms = SubmitState.createUiAtoms(createAtomsParams, callbackAtoms);
    const policyAtoms = PolicyState.createUiAtoms(createAtomsParams, callbackAtoms);
    const optionsAtoms = OptionsState.createAtoms(createAtomsParams, callbackAtoms);

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
    };
}

export function createManiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom): ManiAtoms {
    const rv: any = [];
    const callbackAtoms = rv as ManiAtoms;

    const changesSet = proxySet<string>();

    rv.push(createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.login, changesSet }, callbackAtoms));
    rv.push(createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.cpass, changesSet }, callbackAtoms));
    rv.push(changesSet);

    return rv;
}

// export function createManiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom): ManiAtoms {

//     const changesAtom = atom(0);
//     const loginAtoms = createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.login, changesAtom });
//     const cpassAtoms = createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.cpass, changesAtom });

//     return [loginAtoms, cpassAtoms, changesAtom];
// }
