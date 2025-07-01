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

export type NFormCnt = {                        // Normal form content
    rowCtxs: FieldRowCtx[];
    submitCtx: SubmitFieldTypes.Ctx;
};

export type MFormCnt = ManualEditorTypes.Ctx;   // Manual form content

//

type FormOptionsAndFileUsCtxAtoms = {
    fileUsCtx: FileUsCtx;
    options: OptionsState.Atoms;
};

export type FieldRowCtx = NormalField.RowCtx;
export type FormFieldCtxs = FieldRowCtx[];

export type AnyFormAtoms = Prettify<
    & {
        normal?: NFormCnt;                      // If form is not manual then it'll dummy empty [] and dummy SubmitState.Atoms
        manual?: MFormCnt;                      // If form is not manual then it'll dummy empty []
    }
    & {
        formFieldsAtom: Atom<FormFieldCtxs>;    // Fields in normal or manual form (maybe enough just passwords?)
    }
    & FormOptionsAndFileUsCtxAtoms
>;

export type NFormAtoms = Prettify<{ normal: NFormCnt; } & FormOptionsAndFileUsCtxAtoms>;
export type MFormAtoms = Prettify<{ manual: MFormCnt; } & FormOptionsAndFileUsCtxAtoms>;

// ManiAtoms

const loginFieldsIdx = 2;
const cpassFieldsIdx = 3;

export type ManiAtoms = readonly [
    login: AnyFormAtoms | undefined,
    cpass: AnyFormAtoms | undefined,
    loginFields: Atom<FormFieldCtxs>,           // These are always defined, read only, and reactive
    cpassFields: Atom<FormFieldCtxs>,           // If login or cpass form does not exist then this is empty array
];

//

export type NFormProps = {                      // To access normal form fields and submit
    maniAtoms: ManiAtoms;
    formIdx: FormIdx;
    nAllAtoms: NFormAtoms;
};

export type MFormProps = {                      // To access manual form fields
    maniAtoms: ManiAtoms;
    formIdx: FormIdx;
    mAllAtoms: MFormAtoms;
};

export type OFormProps = {                      // To access form options
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
    nFieldCtx?: FieldRowCtx;
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

// Form fields access atoms

type AllFormsFieldsAtoms = {
    loginAtom: Atom<FormFieldCtxs>,
    cpassAtom: Atom<FormFieldCtxs>,
};

type AllFormsFields = {
    login: FormFieldCtxs,
    cpass: FormFieldCtxs,
};

export function getAllFormsFieldsAtoms(maniAtoms: ManiAtoms): AllFormsFieldsAtoms {
    return {
        loginAtom: maniAtoms[loginFieldsIdx],
        cpassAtom: maniAtoms[cpassFieldsIdx],
    };
}

export function getManiAtomsAllFormsFields(maniAtoms: ManiAtoms, get: Getter): AllFormsFields {
    const { loginAtom, cpassAtom } = getAllFormsFieldsAtoms(maniAtoms);
    return {
        login: get(loginAtom),
        cpass: get(cpassAtom),
    };
}

export function getAllFormsFields(fileUsCtx: FileUsCtx, get: Getter): AllFormsFields {
    const { loginAtom, cpassAtom } = getAllFormsFieldsAtoms(safeManiAtoms(get(fileUsCtx.fileUs.maniAtomsAtom)));
    return {
        login: get(loginAtom),
        cpass: get(cpassAtom),
    };
}

//
