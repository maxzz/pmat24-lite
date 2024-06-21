import { useAtomValue } from "jotai";
import { FileUs, FormIdx } from "@/store/store-types";
import { OptionsAllGroups } from "../1-form-editor/4-options";
import { FormAtoms, ManiAtoms } from "@/store/atoms/3-file-mani-atoms";

function FormOptions({ maniAtoms, formAtoms, formIdx }: { maniAtoms: ManiAtoms; formAtoms: FormAtoms; formIdx: FormIdx; }) {
    const title = formIdx === FormIdx.login ? 'Login form options' : 'Change password form options';
    return (
        <div className="ml-1 mr-3 mt-2 first:mt-0">
            <div className="text-sm font-semibold">
                {title}
            </div>

            <OptionsAllGroups maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        </div>
    );
}

export function TabFormOptions({ fileUs }: { fileUs: FileUs; }) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const [login, cpass] = maniAtoms;

    if (!login && !cpass) {
        return (
            <div>
                No forms. It can be a manifest without forms to exclude website support.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            {login && <FormOptions maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} />}
            {cpass && <FormOptions maniAtoms={maniAtoms} formAtoms={cpass} formIdx={FormIdx.cpass} />}
        </div>
    );
}
