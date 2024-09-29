import { useAtomValue } from "jotai";
import { FileUs } from "@/store/store-types";
import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type OFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { SectionTitle } from "../9-controls";
import { GroupGeneral } from "./1-group-general";
import { GroupLogin } from "./2-group-login";
import { GroupCpass } from "./3-group-cpass";

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?

const optionsAllGroupsClasses = "ml-1 mr-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none";

function OptionsContent({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const [login, cpass] = maniAtoms;

    const loginCtx: OFormContextProps | undefined = login && { maniAtoms, formAtoms: { fileUsCtx: login.fileUsCtx, options: login.options }, formIdx: FormIdx.login };
    return (
        <div className={optionsAllGroupsClasses}>
            {login && loginCtx && (<>
                <SectionTitle label="Manifest options" />
                <GroupGeneral ctx={loginCtx} />

                <SectionTitle label="Login form options" />
                <GroupLogin maniAtoms={maniAtoms} formAtoms={login} formIdx={FormIdx.login} />
            </>)}

            {cpass && (<>
                <SectionTitle label="Password change form options" />
                <GroupCpass maniAtoms={maniAtoms} formAtoms={cpass} formIdx={FormIdx.cpass} />
            </>)}
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
                No forms. It can be a manifest to exclude website support (It has to be no fields not forms).
            </div>
        );
    }

    return (
        <OptionsContent maniAtoms={maniAtoms} />
    );
}
