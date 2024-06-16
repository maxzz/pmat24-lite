import { proxySet } from "valtio/utils";
import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { CreateAtomsParams, FormAtoms, ManiAtoms } from "../../9-types";
import { FieldsState } from "../../1-fields/1-fields-atoms";
import { SubmitState } from "../../2-submit";
import { PolicyState } from "../../3-policy-nun";
import { OptionsState } from "../../4-options";

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

    const rv: FormAtoms = {
        fieldsAtoms,
        submitAtoms,
        policyAtoms,
        optionsAtoms,

        params: createAtomsParams,
    };

    return rv;
}

export function createManiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom): ManiAtoms {
    const rv: any = [];
    const callbackAtoms = rv as ManiAtoms;

    const changesSet = proxySet<string>();

    rv.push(createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.login }, callbackAtoms));
    rv.push(createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.cpass }, callbackAtoms));
    rv.push(changesSet);

    return rv;
}
