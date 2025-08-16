import { type GetterWithPeek, type SetterWithRecurse, useCallbackOne } from "@/utils";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FieldRowCtx, type MFormProps, getAllFormsFieldsAtoms, safeByContext } from "@/store/2-file-mani-atoms";

export function loginChangesEffectFn({ mFormProps }: { mFormProps: MFormProps; }) { //TODO: give maniAtomsAtom instead of mFormProps (and .mFormCtx.fileUsCtx.fileUs.maniAtomsAtom)
    const rv = useCallbackOne(
        (get: GetterWithPeek, set: SetterWithRecurse) => {
            //printMFormProps(mFormProps);

            const maniAtomsAtom = mFormProps.mFormCtx?.fileUsCtx?.fileUs?.maniAtomsAtom;
            if (!maniAtomsAtom) { // This may happen when all files are closed and atoms are disposed, but we still get deps call since we get maniAtomsAtom
                return;
            }

            const maniAtoms = safeByContext(get(maniAtomsAtom));
            const { loginAtom, cpassAtom } = getAllFormsFieldsAtoms(maniAtoms);

            const loginPsws = new Set(get(loginAtom).filter((field) => get(field.typeAtom) === FieldTyp.psw).map((field) => field.metaField.uuid));
            const cpassPsws = get(cpassAtom).filter((field) => get(field.typeAtom) === FieldTyp.psw);

            setTimeout(() => {
                cpassPsws.forEach(
                    (field) => {
                        const rfieldUuid = get(field.rfieldUuidAtom);
                        if (rfieldUuid && !loginPsws.has(rfieldUuid)) {
                            console.log(`cpassChangesEffectFn: rfieldUuid:${rfieldUuid} is not in loginPsws`, { loginPsws, cpassPsws, field });
                            set(field.rfieldUuidAtom, 0);
                        }
                    }
                );
            }, 1000); // We have debounce for value changes and as result we have only the latest change triggered by our set and we are loosing original value from any input or select. debounce value is 100ms and this timeout should be longer than 100ms.

            //printForms('loginChangesEffectFn after links update', mFormProps.mFormCtx.fileUsCtx.formIdx, get(loginAtom), get(cpassAtom), get);
        }, [mFormProps.mFormCtx?.fileUsCtx?.fileUs?.maniAtomsAtom]
    );
    return rv;
}

function printMFormProps(mFormProps: MFormProps) {
    console.log(`loginChangesEffectFn formIdx:${mFormProps.mFormCtx.fileUsCtx.formIdx} ${mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom.toString()}`);
}

function printForms(label: string, formIdx: FormIdx, loginFields: FieldRowCtx[], cpassFields: FieldRowCtx[], get: Getter) {
    console.log(`%c${formIdx === FormIdx.login ? 'login' : 'cpass'} %c${label}`, formIdx === FormIdx.login ? 'color: forestgreen' : 'color: darkseagreen', 'font-size:0.5rem');

    loginFields.length && printFields(loginFields, get);
    cpassFields.length && printFields(cpassFields, get);

    function printFields(fields: FieldRowCtx[], get: Getter) {
        const colors: string[] = [];
        const lines: string[] = [];

        function collect(fields: FieldRowCtx[], get: Getter) {
            fields.forEach((field) => {
                const type = get(field.typeAtom) === FieldTyp.psw ? 'psw' : 'txt';
                const rfieldValue = get(field.rfieldAtom);
                const rfield = rfieldValue === 'in' ? ' in' : rfieldValue === 'out' ? ' out' : '   ';
                lines.push(`%c          ${type}: this.uuid: %c${asString(field.metaField.uuid)} %cref.uuid: %c${asString(get(field.rfieldUuidAtom))} %cdir:'${rfield}' %c'${get(field.labelAtom)}'`);
                colors.push(
                    'font-size:0.5rem; color: forestgreen',
                    'color: forestgreen',
                    'font-size:0.5rem; color: forestgreen',
                    'color: forestgreen',
                    'font-size:0.5rem; color: forestgreen',
                    'color: black'
                );
            });
        }

        collect(fields, get);
        console.log(lines.join('\n'), ...colors);
    }

    function asString(nvalue: number, n: number = 7): string {
        return nvalue.toString().padEnd(n, ' ');
    }
}
