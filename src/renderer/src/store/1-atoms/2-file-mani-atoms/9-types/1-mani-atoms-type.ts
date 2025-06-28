import { type Atom, type Getter, type Setter } from 'jotai';
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type FormIdx } from '@/store/manifest';
import { type SubmitFieldTypes, type NormalField } from '../1-normal-fields';
import { type ManualFieldState, type ManualEditorTypes } from "../2-manual-fields";
import { type OptionsState } from "../4-options";

export type FileUsCtx = {
    fileUs: FileUs;
    fileUsAtom: FileUsAtom;
    formIdx: FormIdx;
};

//

export type NFormCtx = {
    rowCtxs: NormalField.RowCtx[];
    submitCtx: SubmitFieldTypes.Ctx;
};

export type MFormCtx = ManualEditorTypes.Ctx;

//

export type FormOptionsAndFileUsCtxAtoms = {
    fileUsCtx: FileUsCtx;
    options: OptionsState.Atoms;
};

export type FormFields = NormalField.RowCtx[];

export type AnyFormAtoms = Prettify<
    & {
        normal?: NFormCtx;                  // If form is not manual then it'll dummy empty [] and dummy SubmitState.Atoms
        manual?: MFormCtx;                  // If form is not manual then it'll dummy empty []
    }
    & {
        formFieldsAtom: Atom<FormFields>;   // Fields in normal or manual form (maybe enough just passwords?)
    }
    & FormOptionsAndFileUsCtxAtoms
>;

export type NFormAtoms = Prettify<{ normal: NFormCtx; } & FormOptionsAndFileUsCtxAtoms>;
export type MFormAtoms = Prettify<{ manual: MFormCtx; } & FormOptionsAndFileUsCtxAtoms>;

//

export const loginFieldsIdx = 2;
export const cpassFieldsIdx = 3;

export type ManiAtoms = readonly [
    login: AnyFormAtoms | undefined,
    cpass: AnyFormAtoms | undefined,
    loginFields: Atom<FormFields>,          // These are always defined, read only, and reactive
    cpassFields: Atom<FormFields>,          // If login or cpass form does not exist then this is empty array
];

//

export type NFormContextProps = {           // To access normal form fields and submit
    maniAtoms: ManiAtoms;
    formIdx: FormIdx;
    nAllAtoms: NFormAtoms;
    fieldsAtom: Atom<FormFields>;           // Reactive fields in normal form (they are never changed)
};

export type MFormContextProps = {           // To access manual form fields
    maniAtoms: ManiAtoms;
    formIdx: FormIdx;
    mAllAtoms: MFormAtoms;
    fieldsAtom: Atom<FormFields>;           // Reactive fields in manual form (updated when chunks are changed)
};

export type OFormContextProps = {           // To access form options
    maniAtoms: ManiAtoms;
    oAllAtoms: FormOptionsAndFileUsCtxAtoms;
    formIdx: FormIdx;
};

//

export type OnChangeProps = {
    fileUsCtx: FileUsCtx;
    maniAtoms: ManiAtoms;
    get: Getter;
    set: Setter;
};

// Field highlight during manifest creation

export type FieldHighlightCtx = {
    nFieldCtx?: NormalField.RowCtx;
    mFieldCtx?: ManualFieldState.Ctx;
    fileUs: FileUs;
    formIdx: FormIdx;
};

// Safe accessors by context of calling function

export function safeManiAtoms(maniAtoms: ManiAtoms | null): ManiAtoms {
    if (!maniAtoms) {
        throw new Error('no.mani');
    }
    return maniAtoms;
}

export function safeByContext<T>(obj: T | null | undefined): NonNullable<T> {
    if (!obj) {
        throw new Error('no.obj');
    }
    return obj;
}

// Form fields atoms

type FormsFieldsAtoms = {
    loginAtom: Atom<FormFields>,
    cpassAtom: Atom<FormFields>,
};

export function getFormsFieldsAtoms(maniAtoms: ManiAtoms): FormsFieldsAtoms {
    return {
        loginAtom: maniAtoms[loginFieldsIdx],
        cpassAtom: maniAtoms[cpassFieldsIdx],
    };
}

//
