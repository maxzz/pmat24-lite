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

// Form content

export type NFormCnt = {                        // Normal form content
    rowCtxs: FieldRowCtx[];
    submitCtx: SubmitFieldTypes.Ctx;
};

export type MFormCnt = ManualEditorTypes.Ctx;   // Manual form content

//

export type AnyFormAtoms = {
    fileUsCtx: FileUsCtx;
    normal?: NFormCnt;
    manual?: MFormCnt;
    options: OptionsState.Atoms;
    fieldsAtom: Atom<FieldRowCtx[]>;            // Fields in normal or manual form (maybe enough just passwords?)
};

// type NFormCtx = Omit<AnyFormAtoms, 'manual'>;
// type MFormCtx = Omit<AnyFormAtoms, 'normal'>;
// type MFormCtx2 = Prettify<RequireAtLeastOne<MFormCtx, 'manual'>>;

type NFormCtx = Omit<AnyFormAtoms, 'manual'>;
type MFormCtx = Omit<AnyFormAtoms, 'normal'>;
type MFormCtx2 = Prettify<RequireAtLeastOne<Pick<AnyFormAtoms, 'manual' | 'options' | 'fileUsCtx'>, 'manual'>>;

type FormOptionsAndFileUsCtxAtoms = Prettify<
    Pick<AnyFormAtoms, 'options' | 'fileUsCtx'>
>;

export type NFormAtoms = Prettify<{ normal: NFormCnt; } & FormOptionsAndFileUsCtxAtoms>;
export type MFormAtoms = Prettify<{ manual: MFormCnt; } & FormOptionsAndFileUsCtxAtoms>;

// ManiAtoms

const loginFieldsIdx = 2;
const cpassFieldsIdx = 3;

export type ManiAtoms = readonly [
    login: AnyFormAtoms | undefined,
    cpass: AnyFormAtoms | undefined,
    lFields: Atom<FieldRowCtx[]>,               // login fields // login and cpass fields are always defined (if no form then it's []), read only, and reactive
    cFields: Atom<FieldRowCtx[]>,               // cpass fields
];

// Props given to children of form editor

export type NFormProps = {                      // To access normal form fields and submit
    formIdx: FormIdx;
    maniAtoms: ManiAtoms;
    nAllAtoms: NFormAtoms;
};

export type MFormProps = {                      // To access manual form fields
    formIdx: FormIdx;
    maniAtoms: ManiAtoms;
    mAllAtoms: MFormAtoms;
};

export type OFormProps = {                      // To access form options
    formIdx: FormIdx;
    maniAtoms: ManiAtoms;
    oAllAtoms: FormOptionsAndFileUsCtxAtoms;
};

// Changes callback props

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

export type FieldRowCtx = NormalField.RowCtx;
//export type FormFieldCtxs = FieldRowCtx[];

type AllFormsFieldsAtoms = {
    loginAtom: Atom<FieldRowCtx[]>,
    cpassAtom: Atom<FieldRowCtx[]>,
};

type AllFormsFields = {
    login: FieldRowCtx[],
    cpass: FieldRowCtx[],
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
