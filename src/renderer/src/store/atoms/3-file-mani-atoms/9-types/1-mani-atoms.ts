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

//

export type AnyFormOptionsAtoms = {
    options: OptionsState.Atoms;
    fileUsParams: FileUsParams;
};

export type AnyFormAtoms = Prettify<
    & {
        normal?: NormalFormAtoms;           // If form is not manual then it'll dummy empty [] and dummy SubmitState.Atoms
        manual?: ManualFormAtoms;           // If form is not manual then it'll dummy empty []
    }
    & AnyFormOptionsAtoms
>;

export type NFormAtoms = Prettify<
    & {
        normal: NormalFormAtoms;            // If form is not manual then it'll dummy empty [] and dummy SubmitState.Atoms
    }
    & AnyFormOptionsAtoms
>;

export type MFormAtoms = Prettify<
    & {
        manual: ManualFormAtoms;            // If form is not manual then it'll dummy empty []
    }
    & AnyFormOptionsAtoms
>;

//

export type ManiAtoms = readonly [login: AnyFormAtoms | undefined, cpass: AnyFormAtoms | undefined];
//

export type OFormContextProps = {           // To access form options
    maniAtoms: ManiAtoms;
    formIdx: FormIdx;
    formAtoms: AnyFormOptionsAtoms;
};

export type NFormContextProps = {
    maniAtoms: ManiAtoms;
    formIdx: FormIdx;
    formAtoms: NFormAtoms;
};

export type MFormContextProps = {
    maniAtoms: ManiAtoms;
    formIdx: FormIdx;
    formAtoms: MFormAtoms;
};
