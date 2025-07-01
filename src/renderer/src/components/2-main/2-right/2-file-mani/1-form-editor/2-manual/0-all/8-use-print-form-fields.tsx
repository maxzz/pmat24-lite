import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type FormFieldCtxs, type NormalField, getAllFormsFieldsAtoms  } from "@/store/1-atoms/2-file-mani-atoms";

export function usePrintFormFields({ maniAtoms, formIdx }: { maniAtoms: ManiAtoms; formIdx: FormIdx; }) {
    const { loginAtom, cpassAtom } = getAllFormsFieldsAtoms(maniAtoms);
    const loginFields = useAtomValue(loginAtom);
    const cpassFields = useAtomValue(cpassAtom);

    const doPrintFields = useSetAtom(doPrintFieldsAtom);

    useEffect(
        () => {
            console.log(`%c ------------render ------------%c ${formIdx ? 'cpass' : 'login'} `, 'background-color: #ff00ff50; color: white;', 'color: magenta');

            doPrintFields({ label: `login`, formIdx, fields: loginFields });
            doPrintFields({ label: `cpass`, formIdx, fields: cpassFields });
        }, [loginFields, cpassFields]
    );
}

const doPrintFieldsAtom = atom(
    null, 
    (get, set, {label, formIdx, fields}: { label: string; formIdx: FormIdx; fields: FormFieldCtxs; }): void => {
        const color = formIdx ? 'green' : 'limegreen';
        console.log(`    ${label}:`);

        for (const field of fields) {
            console.log('%c        field:', `color: ${color}`, set(doPrintFieldAtom, field));
        }
    }
);

const doPrintFieldAtom = atom(
    null, 
    (get, set, field: NormalField.RowCtx): string => {
        const s = `"${get(field.labelAtom)}"`;
        return s;
    }
);
