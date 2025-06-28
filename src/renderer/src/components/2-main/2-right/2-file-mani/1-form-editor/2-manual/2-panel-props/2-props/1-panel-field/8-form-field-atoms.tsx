import { atom } from "jotai";
import { type FormFields, type FileUsCtx, type NormalField, cpassFieldsIdx, loginFieldsIdx, safeManiAtoms, getFormsFieldsAtoms, getFormsFields } from "@/store/1-atoms/2-file-mani-atoms";
import { type OptionTextValue, FieldTyp, FormIdx } from "@/store/manifest";

export const buildDropdownFieldsAtom = atom(
    null,
    (get, set, rowCtx: NormalField.RowCtx, fileUsCtx: FileUsCtx): OptionTextValue[] => {
        const fields = set(loginFormPasswordsAtom, fileUsCtx);

        set(printFieldsAtom, get(rowCtx.rfieldUuidAtom), fields);

        const rv = (fields || []).map<OptionTextValue>((field) => ([get(field.labelAtom), `${field.metaField.uuid}`]));
        rv.unshift(['No link', '0']);
        return rv;
    }
);

const loginFormPasswordsAtom = atom(
    null,
    (get, set, fileUsCtx: FileUsCtx): NormalField.RowCtx[] => {
        const loginFields = getFormsFields(fileUsCtx, get).login;
        const rv = loginFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);
        return rv;
    }
);

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

export const isSpecialCpassFieldAtom = atom(
    null,
    (get, set, rowCtx: NormalField.RowCtx, fileUsCtx: FileUsCtx) => {
        const isCpass = fileUsCtx.formIdx === FormIdx.cpass;
        const specialCpass = isCpass && get(rowCtx.typeAtom) === FieldTyp.psw && !!get(rowCtx.rfieldUuidAtom); //TODO: and not linked; add field for linked value
        return specialCpass;
    }
);
