import { atom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx, getAllFormsFields_byFileUsCtx } from "../9-types";

export const isLinkedToLoginAtom = atom(
    null,
    (get, set, thisUuid: number, isPsw: boolean, fileUsCtx: FileUsCtx): boolean => {
        const loginFields = getAllFormsFields_byFileUsCtx(fileUsCtx, get).login;
        const loginPasswords = loginFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);

        const rIndexUuidItem = loginPasswords.find((field) => field.metaField.uuid === thisUuid);

        const isCpassForm = fileUsCtx.formIdx === FormIdx.cpass;

        const isLinked = isCpassForm && isPsw && !!thisUuid && !!rIndexUuidItem;
        return isLinked;
    }
);
