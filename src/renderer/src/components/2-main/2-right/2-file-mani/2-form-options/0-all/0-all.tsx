import { useAtomValue } from "jotai";
import { FileUs, FormIdx, OptionsGroup } from "@/store/store-types";
import { FormOptions } from "./1-tab-all-options";
import { ManiAtoms } from "@/store/atoms/3-file-mani-atoms";

export function TabFormOptions({ fileUs }: { fileUs: FileUs; }) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    return (
        <div className="flex flex-col gap-1">
            <OptionsContent maniAtoms={maniAtoms} />
        </div>
    );
}

export function OptionsContent({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const [login, cpass] = maniAtoms;

    if (!login && !cpass) {
        return (
            <div>
                No forms. It can be a manifest without forms to exclude website support.
            </div>
        );
    }

    return (<>
        {login && <FormOptions maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} optionsGroup={OptionsGroup.header} />}
        {login && <FormOptions maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} optionsGroup={OptionsGroup.login} />}
        {cpass && <FormOptions maniAtoms={maniAtoms} formAtoms={cpass} formIdx={FormIdx.cpass} optionsGroup={OptionsGroup.cpass} />}
    </>
    );
}
