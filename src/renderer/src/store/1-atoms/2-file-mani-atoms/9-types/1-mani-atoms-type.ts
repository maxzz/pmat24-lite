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

// ManiAtoms as ManiFormsCtx witn all atoms

export type AnyFormCtx = {
    fileUsCtx: FileUsCtx;
    normal?: NFormCnt;
    manual?: MFormCnt;
    options: OptionsState.Atoms;
    fieldsAtom: Atom<FieldRowCtx[]>;            // Fields in normal or manual form (maybe enough just passwords?)
};

export type ManiAtoms = readonly [
    login: AnyFormCtx | undefined,
    cpass: AnyFormCtx | undefined,
    lFields: Atom<FieldRowCtx[]>,               // login fields // login and cpass fields are always defined (if no form then it's []), read only, and reactive
    cFields: Atom<FieldRowCtx[]>,               // cpass fields
];

// Props given to children of form editor

export type NFormProps = {                      // To access 'normal' form fields and submit
    maniAtoms: ManiAtoms;
    nFormCtx: NFormCtx;                         // This is maniAtoms[formIdx] with required 'normal' member
};

export type MFormProps = {                      // To access 'manual' form fields
    maniAtoms: ManiAtoms;
    mFormCtx: MFormCtx;                         // This is maniAtoms[formIdx] with required 'manual' member
};

export type OFormProps = {                      // To access form options
    maniAtoms: ManiAtoms;
    oAllAtoms: OFormCtx;
};

export type NFormCtx = Prettify<RequireAtLeastOne<Omit<AnyFormCtx, 'manual'>, 'normal'>>;
export type MFormCtx = Prettify<RequireAtLeastOne<Omit<AnyFormCtx, 'normal'>, 'manual'>>;
type OFormCtx = Prettify<Pick<AnyFormCtx, 'options' | 'fileUsCtx'>>;

// Changes callback props

export type OnChangeProps = {
    fileUsCtx: FileUsCtx;
    //maniAtoms: ManiAtoms;
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

export function safeByContext<T>(obj: T | null | undefined): NonNullable<T> {
    if (!obj) {
        throw new Error('no.obj');
    }
    return obj;
}

export function safeManiAtoms(maniAtoms: ManiAtoms | null): ManiAtoms {
    if (!maniAtoms) {
        throw new Error('no.mani');
    }
    return maniAtoms;
}

export function safeManiAtomsFromFileUsCtx(fileUsCtx: FileUsCtx | null | undefined, get: Getter): ManiAtoms {
    return safeByContext(get(safeByContext(fileUsCtx?.fileUs?.maniAtomsAtom)));
}

// Type safety guards

export function isNormalForm(formCtx: AnyFormCtx): formCtx is NFormCtx {
    return !!formCtx.normal;
}

export function isManualForm(formCtx: AnyFormCtx): formCtx is MFormCtx {
    return !!formCtx.manual;
}

// Form fields access atoms

export type FieldRowCtx = NormalField.RowCtx;

type AllFormsFieldsAtoms = {
    loginAtom: Atom<FieldRowCtx[]>,
    cpassAtom: Atom<FieldRowCtx[]>,
};

type AllFormsFields = {
    login: FieldRowCtx[],
    cpass: FieldRowCtx[],
};

export const lFieldsIdx = 2;                    // Login fields index in maniAtoms
export const cFieldsIdx = 3;                    // Cpass fields index in maniAtoms

export function getAllFormsFieldsAtoms(maniAtoms: ManiAtoms): AllFormsFieldsAtoms {
    return {
        loginAtom: maniAtoms[lFieldsIdx],
        cpassAtom: maniAtoms[cFieldsIdx],
    };
}

export function getAllFormsFields_byManiAtoms(maniAtoms: ManiAtoms, get: Getter): AllFormsFields {
    const { loginAtom, cpassAtom } = getAllFormsFieldsAtoms(maniAtoms);
    return {
        login: get(loginAtom),
        cpass: get(cpassAtom),
    };
}

export function getAllFormsFields_byFileUsCtx(fileUsCtx: FileUsCtx, get: Getter): AllFormsFields {
    const maniAtoms = safeManiAtoms(get(fileUsCtx.fileUs.maniAtomsAtom));
    return getAllFormsFields_byManiAtoms(maniAtoms, get);
}

// Guards

export function guardedFormIdx(mFormProps: MFormProps): FormIdx {
    if (mFormProps?.mFormCtx?.fileUsCtx?.formIdx === undefined) {
        console.error('no.mFormProps');
    }
    return mFormProps?.mFormCtx?.fileUsCtx?.formIdx || 0;
}

//
