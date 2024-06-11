import { useAtomValue } from "jotai";
import { FileUs, FormIdx } from "@/store/store-types";
import { TabOptions } from "../1-form-editor/4-options";
import { ManiAtoms, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";

function TabOptionsGuarded({ maniAtoms, formIdx }: { maniAtoms: ManiAtoms; formIdx: FormIdx; }) {

    const formAtoms = maniAtoms[formIdx];
    if (!formAtoms) {
        return null;
    }

    const tabSectionProps: TabSectionProps = {
        maniAtoms,
        formAtoms,
        formIdx,
    };

    return (
        <div>
            <div className="text-base font-semibold">
                {formIdx === FormIdx.login ? 'Login form options' : 'Change password form options'}
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
            {login && <TabOptionsGuarded maniAtoms={maniAtoms} formIdx={FormIdx.login} />}
            {cpass && <TabOptionsGuarded maniAtoms={maniAtoms} formIdx={FormIdx.cpass} />}
        </div>
    );
}
