import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { FieldsState } from "../1-fields";
import { SubmitState } from "../2-submit";
import { PolicyState } from "../3-nun-policy";
import { OptionsState } from "../4-options";

export type CreateAtomsParams = {
    fileUs: FileUs;
    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;
};

export type FormAtoms = {
    fieldsAtoms: FieldsState.Atoms[];
    submitAtoms: SubmitState.Atoms;
    policyAtoms: PolicyState.Atoms[];
    optionsAtoms: OptionsState.Atoms;

    params: CreateAtomsParams;
};

export type ManiAtoms = readonly [login: FormAtoms | undefined, cpass: FormAtoms | undefined];
//

export type TabSectionProps = {
    maniAtoms: ManiAtoms;
    formAtoms: FormAtoms;
    formIdx: FormIdx;
};
