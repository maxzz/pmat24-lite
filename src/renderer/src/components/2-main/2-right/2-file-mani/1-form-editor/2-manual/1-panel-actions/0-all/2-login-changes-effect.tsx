import { type Getter } from "jotai";
import { type GetterWithPeek, type SetterWithRecurse, useCallbackOne } from "@/utils";
import { type FieldRowCtx, type MFormProps, getAllFormsFieldsAtoms, safeByContext } from "@/store/1-atoms/2-file-mani-atoms";

export function loginChangesEffectFn({ mFormProps }: { mFormProps: MFormProps; }) {
    const rv = useCallbackOne(
        (get: GetterWithPeek, set: SetterWithRecurse) => {
            const maniAtoms = safeByContext(get(mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom));
            const { loginAtom, cpassAtom } = getAllFormsFieldsAtoms(maniAtoms);
            const loginFields = get(loginAtom);
            const cpassFields = get(cpassAtom);

            printFields(mFormProps, loginFields, cpassFields, get);
        }, [mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom]
    );
    return rv;
}

function printFields(mFormProps: MFormProps, loginFields: FieldRowCtx[], cpassFields: FieldRowCtx[], get: Getter) {
    const { fileUsCtx: { formIdx} } = mFormProps.mFormCtx;
    console.log('Effect: formIdx', formIdx);
    printField(loginFields, get);
    printField(cpassFields, get);
}

function printField(fields: FieldRowCtx[], get: Getter) {
    console.log(fields.map((field) => `  uuid:${field.rfieldUuidAtom} ${get(field.labelAtom)}\n`).join(''));
}
