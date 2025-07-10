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
            printFields(mFormProps, get(loginAtom), get(cpassAtom), get);

            const loginPsws = new Set(get(loginAtom).filter((field) => get(field.typeAtom) === FieldTyp.psw).map((field) => field.metaField.uuid));
            const cpassPsws = get(cpassAtom).filter((field) => get(field.typeAtom) === FieldTyp.psw);

            cpassPsws.forEach((field) => {
                if (!loginPsws.has(get(field.rfieldUuidAtom))) {
                    set(field.rfieldUuidAtom, 0);
                }
            });
            printFieldLinks(mFormProps, cpassPsws, get);

        }, [mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom]
    );
    return rv;
}

function printFieldLinks(mFormProps: MFormProps, cpassFields: FieldRowCtx[], get: Getter) {
    const { fileUsCtx: { formIdx } } = mFormProps.mFormCtx;
    console.log('Effect.linked: formIdx', formIdx);
    console.log(cpassFields.map((field) => `  refToUuid:${get(field.rfieldUuidAtom)} ${get(field.labelAtom)}\n`).join(''));
}

function printFields(mFormProps: MFormProps, loginFields: FieldRowCtx[], cpassFields: FieldRowCtx[], get: Getter) {
    const { fileUsCtx: { formIdx } } = mFormProps.mFormCtx;
    console.log('Effect: formIdx', formIdx);
    printField(loginFields, get);
    printField(cpassFields, get);

    function printField(fields: FieldRowCtx[], get: Getter) {
        console.log(fields.map((field) => `  metaUuid:${field.metaField.uuid} refToUuid:${get(field.rfieldUuidAtom)} ${get(field.labelAtom)}\n`).join(''));
    }
}

function printMFormProps(mFormProps: MFormProps) {
    console.log(`loginChangesEffectFn formIdx:${mFormProps.mFormCtx.fileUsCtx.formIdx} ${mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom.toString()}`);
}

//TODO: drill down context reactive atoms to avoid useSetAtom
