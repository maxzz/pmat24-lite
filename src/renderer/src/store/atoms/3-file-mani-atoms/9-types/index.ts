import { PrimitiveAtom } from "jotai";
import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { FieldsState } from "../1-fields";
import { SubmitAtoms } from "../2-submit";
import { PolicyAtoms } from "../3-policy";
import { FormOptionsAtoms } from "../4-options";

export type CreateAtomsParams = {
    fileUs: FileUs;
    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;
    changesAtom: ManiChangesAtom;
};

export type FormChangesProxy = {
    fields: boolean[];
    submit: boolean;
    policy: boolean;
    options: boolean;
}

export type FormAtoms = {
    fieldsAtoms: FieldsState.Atoms[];
    submitAtoms: SubmitAtoms;
    policyAtoms: PolicyAtoms;
    optionsAtoms: FormOptionsAtoms;

    params: CreateAtomsParams;
    changes: FormChangesProxy;
};

export type ManiChangesAtom = PrimitiveAtom<number>;

export type ManiAtoms = readonly [login: FormAtoms | undefined, cpass: FormAtoms | undefined, PrimitiveAtom<number>];
