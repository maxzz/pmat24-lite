import { atom, type Setter } from "jotai";
import { type FileUsCtx, type NormalField, getFormsFields } from "@/store/1-atoms/2-file-mani-atoms";
import { type OptionTextValue, FieldTyp, FormIdx } from "@/store/manifest";

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

//TODO: validate before save
//TODO: convert to/from atoms 'in' and 'out'; rfieldindex
//TODO: set initial relations login <-> cpass

export const doSetInitialRelationsAtom = atom(
    null,
    async (get, set, fileUsCtx: FileUsCtx) => {
        const { login: loginFields, cpass: cpassFields } = getFormsFields(fileUsCtx, get);

        const loginPasswords = loginFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);
        const cpassPasswords = cpassFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);

        const loginPsw = loginPasswords[0];
        const cpassOldPsw = cpassPasswords[0];
        const cpassNewPsw = cpassPasswords[1];
        const cpassCfmPsw = cpassPasswords[2];

        if (loginPsw) {
            linkField(loginPsw, 'in', set);
            linkField(cpassOldPsw, 'out', set);
            linkField(cpassNewPsw, 'out', set);
            linkField(cpassCfmPsw, 'out', set);
        }

    }
);

function linkField(field: NormalField.RowCtx | undefined, dir: 'in' | 'out', set: Setter) {
    if (!field) {
        return;
    }
    set(field.rfieldUuidAtom, field.metaField.uuid);
    set(field.rfieldAtom, dir);
}
