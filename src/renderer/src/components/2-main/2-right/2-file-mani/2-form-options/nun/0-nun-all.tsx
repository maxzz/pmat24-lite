import { useAtomValue } from "jotai";
import { type FileUs } from "@/store/store-types";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { SectionTitle } from "../9-controls";
import { BlockWrap_Detection, BlockWrap_IconPosition, BlockWrap_Auth, BlockWrap_Quicklink, GroupManiGeneral } from "./1-nun-all-block-wraps";
import { BlockWrap_Detection_Button } from "./2-nun-4-screen-detection-btn";

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

    const loginCtx: OFormProps | undefined = login && { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options } };
    const cpassCtx: OFormProps | undefined = cpass && { maniAtoms, oAllAtoms: { fileUsCtx: cpass.fileUsCtx, options: cpass.options } };

    return (
        <div className={optionsAllGroupsClasses}>
            {loginCtx && (<>
                <SectionTitle label="Manifest options" />
                <GroupManiGeneral oFormProps={loginCtx} />

                <SectionTitle label="Login form options" />
                <GroupFormLogin ctx={loginCtx} />
            </>)}

            {cpassCtx && (<>
                <SectionTitle label="Password change form options" />
                <GroupFormCpass ctx={cpassCtx} />
            </>)}
        </div>
    );
}

const optionsAllGroupsClasses = "ml-1 mr-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none";

function GroupFormLogin({ ctx }: { ctx: OFormProps; }) {
    return (<>
        <BlockWrap_Auth oFormProps={ctx} />
        <BlockWrap_Quicklink oFormProps={ctx} />

        {/* <BlockWrap_Detection ctx={ctx} /> */}
        {/* <BlockWrap_Detection_Button ctx={ctx} /> */}
        {/* <BlockWrap_IconPosition ctx={ctx} /> */}
    </>);
}

function GroupFormCpass({ ctx }: { ctx: OFormProps; }) {
    return (<>
        <BlockWrap_Auth oFormProps={ctx} />
        <BlockWrap_Quicklink oFormProps={ctx} />

        {/* <BlockWrap_Detection ctx={ctx} /> */}
        {/* <BlockWrap_Detection_Button ctx={ctx} /> */}
        {/* <BlockWrap_IconPosition ctx={ctx} /> */}
    </>);
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?
