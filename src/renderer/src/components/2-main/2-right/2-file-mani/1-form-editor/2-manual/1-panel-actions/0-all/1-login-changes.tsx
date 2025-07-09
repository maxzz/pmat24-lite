import { useCallback } from "react";
import { useAtomCallback } from "jotai/utils";
import { type MFormProps, getAllFormsFieldsAtoms, safeByContext } from "@/store/1-atoms/2-file-mani-atoms";

export function useLoginChanges({ mFormProps }: { mFormProps: MFormProps; }) {
    const { fileUsCtx } = mFormProps.mFormCtx;
    const rv = useAtomCallback(
        useCallback(
            (get, set) => {
                const maniAtoms = safeByContext(get(mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom));
                const { loginAtom, cpassAtom } = getAllFormsFieldsAtoms(maniAtoms);
                const loginFields = get(loginAtom);
                const cpassFields = get(cpassAtom);

                console.log('cb: loginFields', loginFields);
                console.log('cb: cpassFields', cpassFields);
                
                return { loginFields, cpassFields };
            },
            [fileUsCtx]
        )
    );
    return rv;
}
