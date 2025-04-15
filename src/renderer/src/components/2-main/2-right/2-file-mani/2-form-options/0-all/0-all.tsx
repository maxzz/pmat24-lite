import { useAtomValue } from "jotai";
import { type FileUs } from "@/store/store-types";
import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { SectionTitle } from "../9-controls";
import { GroupFormCpass, GroupManiGeneral, GroupFormLogin } from "./1-options-groups";

export function ManiEditorAllOptions({ fileUs }: { fileUs: FileUs; }) {
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
        <div className={optionsAllGroupsClasses}>
            <OptionsContent maniAtoms={maniAtoms} />
        </div>
    );
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?

function OptionsContent({ maniAtoms }: { maniAtoms: ManiAtoms; }) {

    const [login, cpass] = maniAtoms;
    const loginCtx: OFormContextProps | undefined = login && { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options }, formIdx: FormIdx.login };
    const cpassCtx: OFormContextProps | undefined = cpass && { maniAtoms, oAllAtoms: { fileUsCtx: cpass.fileUsCtx, options: cpass.options }, formIdx: FormIdx.cpass };

    return (<>
        {loginCtx && (<>
            <SectionTitle label="Manifest options" />
            <GroupManiGeneral ctx={loginCtx} />

            <SectionTitle label="Login form options" />
            <GroupFormLogin ctx={loginCtx} />
        </>)}

        {cpassCtx && (<>
            <SectionTitle label="Password change form options" />
            <GroupFormCpass ctx={cpassCtx} />
        </>)}
    </>);
}

const optionsAllGroupsClasses = "ml-1 mr-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none";
