import { type FileUs, type FileUsAtom, FormIdx } from "@/store/store-types";
import { type NormalSubmitState, type NormalFieldsState } from "../1-normal-fields";
import { ManualFieldState } from "../2-manual-fields";
import { OptionsState } from "../4-options";

export type FileUsParams = {
    fileUs: FileUs;
    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;

    isWeb?: boolean;                    // If it's form for website
    isManual?: boolean;                 // If it's a manual mode form
};

//

export type NormalFormAtoms = {
    fieldsAtoms: NormalFieldsState.Atoms[];
    submitAtoms: NormalSubmitState.Atoms;
};

export type ManualFormAtoms = {
    chunks: ManualFieldState.ScriptAtoms;
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
        normal: NormalFormAtoms;
    }
    & AnyFormOptionsAtoms
>;

export type MFormAtoms = Prettify<
    & {
        manual: ManualFormAtoms;
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

export type NFormContextProps = {           // To access normal form fields and submit
    maniAtoms: ManiAtoms;
    formIdx: FormIdx;
    formAtoms: NFormAtoms;
};

export type MFormContextProps = {           // To access manual form fields
    maniAtoms: ManiAtoms;
    formIdx: FormIdx;
    formAtoms: MFormAtoms;
};
