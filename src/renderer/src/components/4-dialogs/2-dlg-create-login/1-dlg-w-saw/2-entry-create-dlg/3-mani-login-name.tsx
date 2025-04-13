import { InputWTooltip } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";
import { OFormContextProps } from "@/store";
import { useAtomValue } from "jotai";
import { FormIdx } from "pm-manifest";
import { newManiContent } from "../../0-ctx-new-mani";

export function ManiLoginName() {
    const fileUs = useAtomValue(newManiContent.fileUsAtom);
    if (!fileUs) {
        return null;
    }

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const [login, cpass] = maniAtoms;
    const loginCtx: OFormContextProps | undefined = login && { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options }, formIdx: FormIdx.login };

    if (!loginCtx) {
        return null;
    }

    const { nameAtom } = loginCtx.oAllAtoms.options.p1General;

    return (
        <div className="px-3 pb-2 text-xs flex flex-col gap-1">
            <div className="font-semibold">
                Login name
            </div>
            <InputWTooltip stateAtom={nameAtom} />
        </div>
    );
}
