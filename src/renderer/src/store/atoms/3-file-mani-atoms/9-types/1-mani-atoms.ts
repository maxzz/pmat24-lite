import { type Getter, type Setter } from 'jotai';
import { type FileUs, type FileUsAtom, FormIdx } from "@/store/store-types";
import { type NormalField } from '../1-normal-fields';
import { type NormalSubmitState } from '../1-normal-fields/0-all-normal-ctx/2-create-submit-context';
import { type ManualEditorState } from "../2-manual-fields";
import { type OptionsState } from "../4-options";

export type FileUsCtx = {
    fileUs: FileUs;
    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;
};

//

export type NFormCtx = {
    fieldsAtoms: NormalField.FieldAtoms[];
    submitAtoms: NormalSubmitState.Atoms;
};

export type MFormCtx = ManualEditorState.ScriptAtoms;

//

type FormOptionsAndFileUsCtxAtoms = {
    fileUsCtx: FileUsCtx;
    options: OptionsState.Atoms;
};

export type AnyFormAtoms = Prettify<
    & {
        normal?: NFormCtx;                  // If form is not manual then it'll dummy empty [] and dummy SubmitState.Atoms
        manual?: MFormCtx;                  // If form is not manual then it'll dummy empty []
    }
    & FormOptionsAndFileUsCtxAtoms
>;

export type NFormAtoms = Prettify<{ normal: NFormCtx; } & FormOptionsAndFileUsCtxAtoms>;
export type MFormAtoms = Prettify<{ manual: MFormCtx; } & FormOptionsAndFileUsCtxAtoms>;

//

export type ManiAtoms = readonly [login: AnyFormAtoms | undefined, cpass: AnyFormAtoms | undefined];

//

export type NFormContextProps = {           // To access normal form fields and submit
    maniAtoms: ManiAtoms;
    formAtoms: NFormAtoms;
    formIdx: FormIdx;
};

export type MFormContextProps = {           // To access manual form fields
    maniAtoms: ManiAtoms;
    formAtoms: MFormAtoms;
    formIdx: FormIdx;
};

export type OFormContextProps = {           // To access form options
    maniAtoms: ManiAtoms;
    formAtoms: FormOptionsAndFileUsCtxAtoms;
    formIdx: FormIdx;
};

//

export type OnChangeProps = {
    fileUsCtx: FileUsCtx;
    maniAtoms: ManiAtoms;
    get: Getter;
    set: Setter;
};
