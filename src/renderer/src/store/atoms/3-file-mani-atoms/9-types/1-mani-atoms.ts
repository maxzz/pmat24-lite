import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { NormalFieldsState } from "../1-fields";
import { SubmitState } from "../2-submit";
import { OptionsState } from "../4-options";

export type FileUsParams = {
    fileUs: FileUs;
    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;

    isWeb?: boolean;                    // If it's form for website
    isManual?: boolean;                 // If it's a manual mode form
};

export type NormalFormAtoms = {
    fieldsAtoms: NormalFieldsState.Atoms[];
    submitAtoms: SubmitState.Atoms;
};

export type ManualFormAtoms = {
};

export type FormAtoms = {
    normal: NormalFormAtoms;            // If form is not manual then it'll dummy empty [] and dummy SubmitState.Atoms
    manual: ManualFormAtoms;            // If form is not manual then it'll dummy empty []

    optionsAtoms: OptionsState.Atoms;

    fileUsParams: FileUsParams;
};

export type ManiAtoms = readonly [login: FormAtoms | undefined, cpass: FormAtoms | undefined];
//

export type FormContextProps = {
    maniAtoms: ManiAtoms;
    formAtoms: FormAtoms;
    formIdx: FormIdx;
};
