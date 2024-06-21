import { useAtomValue } from "jotai";
import { FileUs, FormIdx } from "@/store/store-types";
import { TabOptions } from "../1-form-editor/4-options";
import { FormAtoms, ManiAtoms, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";

function TabOptionsGuarded({ maniAtoms, formAtoms, formIdx }: { maniAtoms: ManiAtoms; formAtoms: FormAtoms; formIdx: FormIdx; }) {
    const title = formIdx === FormIdx.login ? 'Login form options' : 'Change password form options';
    return (
        <div className="ml-1 mr-2">
            <div className="text-sm font-semibold">
                {title}
            </div>

            <TabOptions maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        </div>
    );
}

export default function TabFormOptions({ fileUs }: { fileUs: FileUs; }) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const [login, cpass] = maniAtoms;

    if (!login && !cpass) {
        return (
            <div>
                Not forms. It can be a manifest without forms to exclude website.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            {login && <TabOptionsGuarded maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} />}
            {cpass && <TabOptionsGuarded maniAtoms={maniAtoms} formAtoms={cpass} formIdx={FormIdx.cpass} />}
        </div>
    );
}
