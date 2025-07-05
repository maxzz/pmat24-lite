import { atom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx } from "../9-types";

// Running context check

export const isLinkedCpassFormFieldAtom = atom(
    null,
    (get, set, rowCtx: FieldRowCtx, fileUsCtx: FileUsCtx) => {
        const isCpassForm = fileUsCtx.formIdx === FormIdx.cpass;
        const specialCpass = isCpassForm && get(rowCtx.typeAtom) === FieldTyp.psw && !!get(rowCtx.rfieldUuidAtom); //TODO: and not linked; add field for linked value
        return specialCpass;
    }
);
