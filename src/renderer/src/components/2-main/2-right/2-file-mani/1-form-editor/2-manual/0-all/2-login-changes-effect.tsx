import { type Getter } from "jotai";
import { type GetterWithPeek, type SetterWithRecurse, useCallbackOne } from "@/utils";
import { type FieldRowCtx, type MFormProps, getAllFormsFieldsAtoms, safeByContext } from "@/store/1-atoms/2-file-mani-atoms";
import { FieldTyp } from "@/store/manifest";

export function loginChangesEffectFn({ mFormProps }: { mFormProps: MFormProps; }) {
    const rv = useCallbackOne(
        (get: GetterWithPeek, set: SetterWithRecurse) => {
            //printMFormProps(mFormProps);

            const maniAtoms = safeByContext(get(mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom));
            const { loginAtom, cpassAtom } = getAllFormsFieldsAtoms(maniAtoms);
            printFields('Effect before linking', mFormProps, get(loginAtom), get(cpassAtom), get);

            const loginPsws = new Set(get(loginAtom).filter((field) => get(field.typeAtom) === FieldTyp.psw).map((field) => field.metaField.uuid));
            const cpassPsws = get(cpassAtom).filter((field) => get(field.typeAtom) === FieldTyp.psw);

            cpassPsws.forEach((field) => {
                if (!loginPsws.has(get(field.rfieldUuidAtom))) {
                    set(field.rfieldUuidAtom, 0);
                }
            });
            //printFieldLinks(mFormProps, cpassPsws, get);
            printFields('Effect after linking', mFormProps, get(loginAtom), get(cpassAtom), get);

        }, [mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom]
    );
    return rv;
}

function printFieldLinks(mFormProps: MFormProps, cpassFields: FieldRowCtx[], get: Getter) {
    const { fileUsCtx: { formIdx } } = mFormProps.mFormCtx;
    console.log('Effect.linked: formIdx', formIdx);
    console.log(cpassFields.map((field) => `  refToUuid:${get(field.rfieldUuidAtom)} ${get(field.labelAtom)}\n`).join(''));
}

function printFields(label: string, mFormProps: MFormProps, loginFields: FieldRowCtx[], cpassFields: FieldRowCtx[], get: Getter) {
    const { fileUsCtx: { formIdx } } = mFormProps.mFormCtx;
    console.log(`${label}: formIdx`, formIdx);
    
    let colors: string[] = [];
    let lines: string[] = [];
    printField(loginFields, get);
    console.log(lines.join('\n'), ...colors);

    colors = [];
    lines = [];
    printField(cpassFields, get);
    console.log(lines.join('\n'), ...colors);

    function printField(fields: FieldRowCtx[], get: Getter) {
        fields.forEach((field) => {
            lines.push(`%c        this.uuid: %c${field.metaField.uuid} %cref.uuid: %c${get(field.rfieldUuidAtom)} %c'${get(field.labelAtom)}'`);
            colors.push('font-size:0.5rem; color: forestgreen', 'color: forestgreen', 'font-size:0.5rem; color: forestgreen', 'color: forestgreen', 'color: black');
        });
    }
}

function printMFormProps(mFormProps: MFormProps) {
    console.log(`loginChangesEffectFn formIdx:${mFormProps.mFormCtx.fileUsCtx.formIdx} ${mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom.toString()}`);
}

//TODO: drill down context reactive atoms to avoid useSetAtom
