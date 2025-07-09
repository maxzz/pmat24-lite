import { atomEffect } from "jotai-effect";
import { useCallbackOne } from "@/utils";
import { type MFormProps, getAllFormsFieldsAtoms, safeByContext } from "@/store/1-atoms/2-file-mani-atoms";

export function useLoginChangesEffect({ mFormProps }: { mFormProps: MFormProps; }) {
    atomEffect(
        useCallbackOne(
            (get, set) => {
                const maniAtoms = safeByContext(get(mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom));
                const { loginAtom, cpassAtom } = getAllFormsFieldsAtoms(maniAtoms);
                const loginFields = get(loginAtom);
                const cpassFields = get(cpassAtom);

                console.log('cb: loginFields', loginFields);
                console.log('cb: cpassFields', cpassFields);
            }, [mFormProps.mFormCtx.fileUsCtx.fileUs.maniAtomsAtom]
        )
    );
}
