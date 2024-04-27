import { FileUsAtom, FormIdx } from "@/store/store-types";
import { TableRowAtoms } from "./1-field-atoms";
import { SubmitAtoms } from "./2-submit-atoms";
import { PolicyAtoms } from "./3-policy-atoms";
import { FormOptionsAtoms } from "./4-options-atoms";

export type FormAtoms = {
    fieldsAtoms: TableRowAtoms[];
    submitAtoms: SubmitAtoms;
    policyAtoms: PolicyAtoms;
    optionsAtoms: FormOptionsAtoms;

    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;
};

export type ManiAtoms = {
    loginAtoms: FormAtoms | undefined;
    cpassAtoms: FormAtoms | undefined;
};
