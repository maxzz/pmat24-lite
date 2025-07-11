import { type Getter } from "jotai";
import { type GetterWithPeek, type SetterWithRecurse, useCallbackOne } from "@/utils";
import { type FieldRowCtx, type MFormProps, getAllFormsFieldsAtoms, safeByContext } from "@/store/1-atoms/2-file-mani-atoms";
import { FieldTyp, FormIdx } from "@/store/manifest";

export function loginChangesEffectFn({ mFormProps }: { mFormProps: MFormProps; }) { //TODO: give maniAtomsAtom instead of mFormProps (and .mFormCtx.fileUsCtx.fileUs.maniAtomsAtom)
    const rv = useCallbackOne(
        (get: GetterWithPeek, set: SetterWithRecurse) => {
            //printMFormProps(mFormProps);

            const maniAtoms = safeByContext(get(mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom));
            const { loginAtom, cpassAtom } = getAllFormsFieldsAtoms(maniAtoms);

            const loginPsws = new Set(get(loginAtom).filter((field) => get(field.typeAtom) === FieldTyp.psw).map((field) => field.metaField.uuid));
            const cpassPsws = get(cpassAtom).filter((field) => get(field.typeAtom) === FieldTyp.psw);

            cpassPsws.forEach((field) => {
                if (!loginPsws.has(get(field.rfieldUuidAtom))) {
                    set(field.rfieldUuidAtom, 0);
                }
            });

            printForms('loginChangesEffectFn after links update', mFormProps, get(loginAtom), get(cpassAtom), get);
        }, [mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom]
    );
    return rv;
}

function printMFormProps(mFormProps: MFormProps) {
    console.log(`loginChangesEffectFn formIdx:${mFormProps.mFormCtx.fileUsCtx.formIdx} ${mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom.toString()}`);
}

function printForms(label: string, mFormProps: MFormProps, loginFields: FieldRowCtx[], cpassFields: FieldRowCtx[], get: Getter) {
    const { fileUsCtx: { formIdx } } = mFormProps.mFormCtx;
    console.log(`%c${formIdx === FormIdx.login ? 'login' : 'cpass'} %c${label}`, formIdx === FormIdx.login ? 'color: forestgreen' : 'color: darkseagreen', 'font-size:0.5rem');

    loginFields.length && printFields(loginFields, get);
    cpassFields.length && printFields(cpassFields, get);
}

function printFields(fields: FieldRowCtx[], get: Getter) {
    const colors: string[] = [];
    const lines: string[] = [];

    function collect(fields: FieldRowCtx[], get: Getter) {
        fields.forEach((field) => {
            lines.push(`%c          ${get(field.typeAtom) === FieldTyp.psw ? 'psw' : 'txt'}: this.uuid: %c${field.metaField.uuid} %cref.uuid: %c${get(field.rfieldUuidAtom)} %c'${get(field.labelAtom)}'`);
            colors.push('font-size:0.5rem; color: forestgreen', 'color: forestgreen', 'font-size:0.5rem; color: forestgreen', 'color: forestgreen', 'color: black');
        });
    }

    collect(fields, get);
    console.log(lines.join('\n'), ...colors);
}

//TODO: drill down context reactive atoms to avoid useSetAtom
