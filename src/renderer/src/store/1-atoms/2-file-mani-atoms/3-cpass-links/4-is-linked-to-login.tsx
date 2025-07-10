import { atom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FileUsCtx, getAllFormsFields_byFileUsCtx } from "../9-types";

export const isLinkedToLoginAtom = atom(
    null,
    (get, set, thisUuid: number, isPsw: boolean, fileUsCtx: FileUsCtx): boolean => {
        if (!thisUuid || !isPsw || fileUsCtx.formIdx !== FormIdx.cpass) {
            return false;
        }

        const rIndexUuidItem = getAllFormsFields_byFileUsCtx(fileUsCtx, get)
            .login
            .filter((loginField) => get(loginField.typeAtom) === FieldTyp.psw)
            .find((loginField) => loginField.metaField.uuid === thisUuid);
            
        return !!rIndexUuidItem;
    }
);
