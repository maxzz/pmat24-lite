import { type Getter, type Setter, atom } from "jotai";
import { type OptionTextValue, FieldTyp, FormIdx } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx, type ManiAtoms, getAllFormsFields, getManiAtomsAllFormsFields } from "../9-types";

// Running context check

export const isLinkedCpassFormFieldAtom = atom(
    null,
    (get, set, rowCtx: FieldRowCtx, fileUsCtx: FileUsCtx) => {
        const isCpassForm = fileUsCtx.formIdx === FormIdx.cpass;
        const specialCpass = isCpassForm && get(rowCtx.typeAtom) === FieldTyp.psw && !!get(rowCtx.rfieldUuidAtom); //TODO: and not linked; add field for linked value
        return specialCpass;
    }
);

// Build dropdown login form fields for cpass form

export const buildLoginDropdownFieldsAtom = atom(
    null,
    (get, set, rowCtx: FieldRowCtx, fileUsCtx: FileUsCtx): OptionTextValue[] => {
        const loginFields = getAllFormsFields(fileUsCtx, get).login;
        const loginPasswords = loginFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);

        printFields(rowCtx, loginPasswords, get);

        const rv = loginPasswords.map<OptionTextValue>((field) => ([get(field.labelAtom), `${field.metaField.uuid}`]));
        rv.unshift(['No link', '0']);

        return rv;
    }
);

function printFields(rowCtx: FieldRowCtx, fields: FieldRowCtx[] | undefined, get: Getter) {
    if (!fields) {
        return;
    }
    const rindexUuid = get(rowCtx.rfieldUuidAtom);
    const all = fields.map((field) => `\n  label:${get(field.labelAtom)}, uuid:${field.metaField.uuid}, dbid:${get(field.dbnameAtom)}`).join('') || '[]';
    console.log(`for uuid:"${rindexUuid}" login fields:`, all);
}

// Initial relations for newly created password change form

export const doSetInitialRelationsAtom = atom(
    null,
    async (get, set, maniAtoms: ManiAtoms) => {
        const { login, cpass } = getManiAtomsAllFormsFields(maniAtoms, get);

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

function linkField(cpassField: FieldRowCtx | undefined, loginField: FieldRowCtx | undefined, dir: 'in' | 'out', set: Setter) {
    if (!cpassField || !loginField) {
        return;
    }
    set(cpassField.rfieldUuidAtom, loginField.metaField.uuid); // TODO: do dbname too but when we save manifest. dbname maybe changed, so track only uuid, but maybe track both dbname only istead of uuid?
    set(cpassField.rfieldAtom, dir);
}
