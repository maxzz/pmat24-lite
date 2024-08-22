import { FileUs, FileUsAtom, FormIdx } from "@/store/store-types";
import { NormalFieldsState } from "../1-fields";
import { SubmitState } from "../2-submit";
import { OptionsState } from "../4-options";

export type FileUsParams = {
    fileUs: FileUs;
    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;

    isWeb?: boolean;               // If it's form for website
    isManual?: boolean;            // If it's a manual mode form
};

export type FormAtoms = {
    fieldsAtoms: NormalFieldsState.Atoms[];
    submitAtoms: SubmitState.Atoms;
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
