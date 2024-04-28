import { FileUsAtom, FormIdx } from "@/store/store-types";
import { FieldsState } from "./1-fields";
import { SubmitAtoms } from "./2-submit";
import { PolicyAtoms } from "./3-policy";
import { FormOptionsAtoms } from "./4-options";

export type FormAtoms = {
    fieldsAtoms: FieldsState.Atoms[];
    submitAtoms: SubmitAtoms;
    policyAtoms: PolicyAtoms;
    optionsAtoms: FormOptionsAtoms;

    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;
};

export type ManiAtoms = readonly [login: FormAtoms | undefined, cpass: FormAtoms | undefined];
