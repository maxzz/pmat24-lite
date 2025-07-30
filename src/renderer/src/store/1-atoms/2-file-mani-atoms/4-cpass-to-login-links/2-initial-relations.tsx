import { atom } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { type FieldRowCtx, type ManiAtoms, getAllFormsFields_byManiAtoms } from "../9-types";

// Initial relations for newly created password change form

export const doSetInitialRelationsAtom = atom(
    null,
    async (get, set, maniAtoms: ManiAtoms) => {
        const { login, cpass } = getAllFormsFields_byManiAtoms(maniAtoms, { get });

        const loginPasswords = login.filter((field) => get(field.typeAtom) === FieldTyp.psw);
        const cpassPasswords = cpass.filter((field) => get(field.typeAtom) === FieldTyp.psw);

        const loginPsw = loginPasswords[0];
        const cpassOldPsw = cpassPasswords[0];
        const cpassNewPsw = cpassPasswords[1];
        const cpassCfmPsw = cpassPasswords[2];

        const setOnly = { set };

        linkField(cpassOldPsw, loginPsw, 'in', setOnly);
        linkField(cpassNewPsw, loginPsw, 'out', setOnly);
        linkField(cpassCfmPsw, loginPsw, 'out', setOnly);
    }
);

function linkField(cpassField: FieldRowCtx | undefined, loginField: FieldRowCtx | undefined, dir: 'in' | 'out', { set }: SetOnly) {
    if (!cpassField || !loginField) {
        return;
    }
    set(cpassField.rfieldUuidAtom, loginField.metaField.uuid); // TODO: do dbname too but when we save manifest. dbname maybe changed, so track only uuid, but maybe track both dbname only istead of uuid?
    set(cpassField.rfieldAtom, dir);
}
