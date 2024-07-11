import { proxySet } from "valtio/utils";
import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { FileUsParams, FormAtoms, ManiAtoms } from "../../9-types";
import { FieldsState } from "../../1-fields/1-fields-atoms";
import { SubmitState } from "../../2-submit";
import { PolicyState } from "../../3-policy-nun";
import { OptionsState } from "../../4-options";

function createFormAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): FormAtoms | undefined {

    const { fileUs, formIdx } = fileUsParams;
    const metaForm = fileUs.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return;
    }

    fileUsParams.isWeb = !!metaForm.disp.domain;
    fileUsParams.isManual = metaForm.disp.isScript;

    const rv: FormAtoms = {
        fieldsAtoms: FieldsState.createUiAtoms(fileUsParams, maniAtoms),
        submitAtoms: SubmitState.createUiAtoms(fileUsParams, maniAtoms),
        policyAtoms: PolicyState.createUiAtoms(fileUsParams, maniAtoms),
        optionsAtoms: OptionsState.createAtoms(fileUsParams, maniAtoms),
        fileUsParams,
    };

    return rv;
}

export function createManiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom): ManiAtoms {
    const rv: any = [];
    const maniAtoms = rv as ManiAtoms;

    const changesSet = proxySet<string>();

    rv.push(createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.login }, maniAtoms));
    rv.push(createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.cpass }, maniAtoms));
    rv.push(changesSet);

    return rv;
}
