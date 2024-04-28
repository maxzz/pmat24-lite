import { FileUsAtom, FormIdx } from "@/store/store-types";
import { FieldRowAtoms } from "./1-fields/2-field-atoms";
import { SubmitAtoms } from "./2-submit";
import { PolicyAtoms } from "./3-policy";
import { FormOptionsAtoms } from "./4-options";

export type FormAtoms = {
    fieldsAtoms: FieldRowAtoms[];
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
