import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { FieldTyp } from "pm-manifest";
import { FormAtoms, ManiAtoms } from "./9-types";
import { TableRowState } from "./1-field-atoms";
import { SubmitState } from "./2-submit-atoms";
import { PolicyState } from "./3-policy-atoms";
import { OptionsState } from "./4-options-atoms";

function createFormAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom, formIdx: FormIdx): FormAtoms | undefined {

    const metaForm = fileUs.meta?.[formIdx];
    if (!metaForm) {
        return;
    }

    const fields = metaForm.fields || [];
    const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);

    const tableRowAtoms = nonButtonFields.map((field, idx) => {
        const rv = TableRowState.createUiAtoms(field, ({ get, set }) => TableRowState.debouncedCombinedResultFromAtoms(rv, get, set));
        return rv;
    }) || [];

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
        fieldsAtoms: tableRowAtoms,
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

    return { loginAtoms, cpassAtoms };
}
