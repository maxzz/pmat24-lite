import { atom, useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx, getAllFormsFields_byFileUsCtx } from "../9-types";

export function useIsLinkedToLogin(rowCtx: FieldRowCtx, fileUsCtx: FileUsCtx) {
    const { typeAtom, rfieldUuidAtom } = rowCtx;
    const thisIsPsw = useAtomValue(typeAtom) === FieldTyp.psw;
    const thisUuid = useAtomValue(rfieldUuidAtom);

    const isLinked = useSetAtom(isLinkedToLoginAtom)(thisUuid, thisIsPsw, fileUsCtx);
    return isLinked;
}

const isLinkedToLoginAtom = atom(
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
