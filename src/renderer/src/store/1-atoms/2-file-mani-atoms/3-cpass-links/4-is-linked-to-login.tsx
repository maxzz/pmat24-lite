import { atom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx, getAllFormsFields_byFileUsCtx } from "../9-types";

export const isLinkedToLoginAtom = atom(
    null,
    (get, set, rowCtx: FieldRowCtx, fileUsCtx: FileUsCtx): boolean => {

        const ourUuid = get(rowCtx.rfieldUuidAtom);

        const loginFields = getAllFormsFields_byFileUsCtx(fileUsCtx, get).login;
        const loginPasswords = loginFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);

        const rIndexUuidItem = loginPasswords.find((field) => field.metaField.uuid === ourUuid);

        const isCpassForm = fileUsCtx.formIdx === FormIdx.cpass;
        const isPsw = get(rowCtx.typeAtom) === FieldTyp.psw;
        const isLinked = isCpassForm && isPsw && !!ourUuid && !!rIndexUuidItem;

        return isLinked;
    }
);
