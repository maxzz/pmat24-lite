import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { type NormalField, type FormFields, type MFormContextProps, cpassFieldsIdx, loginFieldsIdx  } from "@/store/1-atoms/2-file-mani-atoms";
import { FormIdx } from "@/store/manifest";

export function usePrintFormFields({ ctx }: { ctx: MFormContextProps; }) {
    const loginFields = useAtomValue(ctx.maniAtoms[loginFieldsIdx]);
    const cpassFields = useAtomValue(ctx.maniAtoms[cpassFieldsIdx]);

    const doPrintFields = useSetAtom(doPrintFieldsAtom);

    useEffect(
        () => {
            console.log(`%c ------------render ------------%c ${ctx.formIdx ? 'cpass' : 'login'} `, 'background-color: #ff00ff50; color: white;', 'color: magenta');

            doPrintFields({ label: `login`, formIdx: ctx.formIdx, fields: loginFields });
            doPrintFields({ label: `cpass`, formIdx: ctx.formIdx, fields: cpassFields });
        }, [loginFields, cpassFields]
    );
}

const doPrintFieldsAtom = atom(
    null, 
    (get, set, {label, formIdx, fields}: { label: string; formIdx: FormIdx; fields: FormFields; }): void => {
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
