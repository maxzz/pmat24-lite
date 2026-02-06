import { type FileUsCtx, getAllFormsFields_byFileUsCtx } from "@/store/2-file-mani-atoms";
import { atom } from "jotai";
import { atomFamily } from "jotai-family";
import { FieldTyp } from "pm-manifest";

export const getDropdownNamesAtom = atomFamily(
    (fileUsCtx: FileUsCtx) => atom(
        (get) => {
            const loginFields = getAllFormsFields_byFileUsCtx(fileUsCtx, { get }).login;
            
            const loginPasswords = loginFields.filter(
                (field) => get(field.typeAtom) === FieldTyp.psw
            );

            const rv = loginPasswords.map(
                (field) => [get(field.labelAtom) || "Without a label", `${field.metaField.uuid}`]
            );

            console.log('getDropdownNamesAtom', JSON.stringify(rv));

            return rv;
        }
    )
);
