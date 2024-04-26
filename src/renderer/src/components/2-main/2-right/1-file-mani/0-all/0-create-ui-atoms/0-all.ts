import { FieldTyp } from "pm-manifest";
import { FileUs, FileUsAtomType, FormIdx } from "@/store/store-types";
import { TableRowState } from "./1-fields-atoms";
import { SubmitState } from "./2-submit-atoms";
import { PolicyState } from "./3-policy-atoms";
import { OptionsState } from "./4-options-atoms";

function createFormAtoms(fileUs: FileUs, fileUsAtom: FileUsAtomType, formIdx: FormIdx) {

    const fields = fileUs.meta?.[formIdx].fields || [];
    const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);

    const tableRowAtoms = nonButtonFields.map((field, idx) => TableRowState.createUiAtoms(field, () => { })) || [];

    const metaForm = fileUs.meta?.[formIdx];

    const rv = {
        tableRowAtoms: tableRowAtoms,
        submitAtoms: SubmitState.createUiAtoms(metaForm, () => { }),
        policyAtoms: PolicyState.createUiAtoms(metaForm, () => { }),
        optionsAtoms: OptionsState.createAtoms('', fileUsAtom, formIdx, () => { }),
    };

    return rv;
}

export function createManiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtomType) {

    const loginAtoms = createFormAtoms(fileUs, fileUsAtom, FormIdx.login);
    const cpassAtoms = createFormAtoms(fileUs, fileUsAtom, FormIdx.cpass);

    return { loginAtoms, cpassAtoms };
}
