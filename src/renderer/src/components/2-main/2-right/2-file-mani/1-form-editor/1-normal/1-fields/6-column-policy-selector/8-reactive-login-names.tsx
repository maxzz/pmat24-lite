import { type FileUsCtx, getAllFormsFields_byFileUsCtx } from "@/store/2-file-mani-atoms";
import { atom } from "jotai";
import { atomFamily } from "jotai-family";
import { type OptionTextValue, FieldTyp } from "@/store/8-manifest";


export const getDropdownNamesAtom = atomFamily(
    (fileUsCtx: FileUsCtx) => atom(
        (get) => {
            const loginFields = getAllFormsFields_byFileUsCtx(fileUsCtx, { get }).login;
            
            const loginPasswords = loginFields.filter(
                (field) => get(field.typeAtom) === FieldTyp.psw
            );

            const rv: OptionTextValue[] = loginPasswords.map(
                (field) => [get(field.labelAtom) || "Without a label", `${field.metaField.uuid}`]
            );

            console.log('getDropdownNamesAtom', JSON.stringify(rv));

            return rv;
        }
    )
);
