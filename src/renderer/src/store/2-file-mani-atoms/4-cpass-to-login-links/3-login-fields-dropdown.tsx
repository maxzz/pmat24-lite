import { atom } from "jotai";
import { type OptionTextValue, FieldTyp, FormIdx } from "@/store/8-manifest";
import { type FieldRowCtx, type FileUsCtx, getAllFormsFields_byFileUsCtx } from "../9-types";

// Build dropdown login form fields for cpass form

export const buildLoginFieldsDropdownAtom = atom(
    null,
    (get, set, rowCtx: FieldRowCtx, fileUsCtx: FileUsCtx): OptionTextValue[] => {
        const loginFields = getAllFormsFields_byFileUsCtx(fileUsCtx, { get }).login;
        const loginPasswords = loginFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);
        //print_Fields(rowCtx, loginPasswords, fileUsCtx.formIdx, { get });

        const rv = loginPasswords.map<OptionTextValue>((field) => ([get(field.labelAtom), `${field.metaField.uuid}`]));

        if (loginPasswords.length) {
            rv.unshift(['Not linked', '0']); // vs. 'No link'
        } else {
            rv.unshift(['There is no password in the login form', '0']);
        }

        return rv;
    }
);

function print_Fields(rowCtx: FieldRowCtx, fields: FieldRowCtx[] | undefined, formIdx: FormIdx, { get }: GetOnly) {
    if (!fields) {
        return;
    }
    console.log(`Form ${formIdx}:`);
    const rindexUuid = get(rowCtx.rfieldUuidAtom);

    const all = fields.map((field) => `\n  label:${get(field.labelAtom)}, uuid:${field.metaField.uuid}, dbid:${get(field.dbnameAtom)}`).join('') || '[]';
    console.log(`  for uuid:"${rindexUuid}" login fields:`, all);
}
