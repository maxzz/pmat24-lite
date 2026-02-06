import { atom } from "jotai";
import { atomFamily } from "jotai-family";
import { type OptionTextValue, FieldTyp } from "@/store/8-manifest";
import { type FileUsCtx, getAllFormsFields_byFileUsCtx } from "@/store/2-file-mani-atoms";

export const getDropdownNamesAtom = atomFamily(
    (fileUsCtx: FileUsCtx) => atom(
        (get) => {
            const loginFields = getAllFormsFields_byFileUsCtx(fileUsCtx, { get }).login;
            
            const loginPasswords = loginFields.filter(
                (field) => get(field.typeAtom) === FieldTyp.psw
            );

            const rv: OptionTextValue[] = loginPasswords.map(
                (field) => [get(field.labelAtom) || "No label", `${field.metaField.uuid}`]
            );

            if (loginPasswords.length) {
                rv.unshift(['Not linked', '0']);  // vs. 'No link'
            } else {
                rv.unshift(['No password', '0']); // There is no password in the login form
            }

            //console.log('getDropdownNamesAtom', JSON.stringify(rv));
            return rv;
        }
    )
);
