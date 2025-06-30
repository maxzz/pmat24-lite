import { atom, type Setter } from "jotai";
import { type OptionTextValue, FieldTyp, FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManiAtoms, getFormsFields, getManiAtomsFormsFields } from "../9-types";
import { type NormalField } from "../1-normal-fields";

// Checks

export const isSpecialCpassFieldAtom = atom(
    null,
    (get, set, rowCtx: NormalField.RowCtx, fileUsCtx: FileUsCtx) => {
        const isCpassForm = fileUsCtx.formIdx === FormIdx.cpass;
        const specialCpass = isCpassForm && get(rowCtx.typeAtom) === FieldTyp.psw && !!get(rowCtx.rfieldUuidAtom); //TODO: and not linked; add field for linked value
        return specialCpass;
    }
);

// Build dropdown login form fields for cpass form

export const buildLoginDropdownFieldsAtom = atom(
    null,
    (get, set, rowCtx: NormalField.RowCtx, fileUsCtx: FileUsCtx): OptionTextValue[] => {
        const loginFields = getFormsFields(fileUsCtx, get).login;
        const loginPasswords = loginFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);

        set(printFieldsAtom, get(rowCtx.rfieldUuidAtom), loginPasswords);

        const rv = loginPasswords.map<OptionTextValue>((field) => ([get(field.labelAtom), `${field.metaField.uuid}`]));
        rv.unshift(['No link', '0']);

        return rv;
    }
);

// Utilities

const printFieldsAtom = atom(
    null,
    (get, set, rindexUuid: number, fields: NormalField.RowCtx[] | undefined) => {
        if (!fields) {
            return;
        }
        const all = fields.map((field) => `label:${get(field.labelAtom)}, dbid:${get(field.dbnameAtom)}`);
        console.log(`for uuid:"${rindexUuid}" login fields:`, all);
    }
);

export const doSetInitialRelationsAtom = atom(
    null,
    async (get, set, maniAtoms: ManiAtoms) => {
        const { login, cpass } = getManiAtomsFormsFields(maniAtoms, get);
        const loginPasswords = login.filter((field) => get(field.typeAtom) === FieldTyp.psw);
        const cpassPasswords = cpass.filter((field) => get(field.typeAtom) === FieldTyp.psw);

        const loginPsw = loginPasswords[0];
        const cpassOldPsw = cpassPasswords[0];
        const cpassNewPsw = cpassPasswords[1];
        const cpassCfmPsw = cpassPasswords[2];

        linkField(cpassOldPsw, loginPsw, 'in', set);
        linkField(cpassNewPsw, loginPsw, 'out', set);
        linkField(cpassCfmPsw, loginPsw, 'out', set);
    }
);

function linkField(cpassField: NormalField.RowCtx | undefined, loginField: NormalField.RowCtx | undefined, dir: 'in' | 'out', set: Setter) {
    if (!cpassField || !loginField) {
        return;
    }
    set(cpassField.rfieldUuidAtom, loginField.metaField.uuid); // TODO: do dbname too but when we save manifest. dbname maybe changed, so track only uuid, but maybe track both dbname only istead of uuid?
    set(cpassField.rfieldAtom, dir);
}
