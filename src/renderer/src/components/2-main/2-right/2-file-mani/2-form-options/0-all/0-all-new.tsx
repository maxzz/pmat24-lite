import { useAtomValue } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { ExtPolicySelect, SectionTitle } from "../9-controls";
import { BlockWrap_Detection, BlockWrap_Auth, BlockWrap_Quicklink, BlockWrap_Icon, GroupManiGeneral } from "./1-all-block-wraps";
import { BlockWrap_Detection_Button } from "./2-4-screen-detection-btn";
import { InFormRowInputWTitle } from "@/ui/local-ui";
import { ManiLoginNameGuarded } from "@/components/4-dialogs";

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

    const loginCtx: OFormContextProps | undefined = login && { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options }, formIdx: FormIdx.login };
    const cpassCtx: OFormContextProps | undefined = cpass && { maniAtoms, oAllAtoms: { fileUsCtx: cpass.fileUsCtx, options: cpass.options }, formIdx: FormIdx.cpass };

    return (
        <div className={optionsAllGroupsClasses}>
            {loginCtx && (<>
                <SectionTitle label="Manifest options" />
                <GroupManiGeneral ctx={loginCtx} />

                {/* <SectionTitle label="Login form options" /> */}
                <GroupFormLogin ctx={loginCtx} />
            </>)}

            {/* {cpassCtx && (<>
                <SectionTitle label="Password change form options" />
                <GroupFormCpass ctx={cpassCtx} />
            </>)} */}
        </div>
    );
}

const optionsAllGroupsClasses = "ml-1 mr-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none";

function GroupFormLogin({ ctx }: { ctx: OFormContextProps; }) {
    const { options } = ctx.oAllAtoms;
    const { nameAtom, balloonAtom } = options.p1General;
    const { aimAtom, lockAtom, auth_plAtom } = options.p3Auth;
    return (<>
    
        <InFormRowInputWTitle stateAtom={nameAtom} label="Managed login name" />

        <InFormRowInputWTitle stateAtom={aimAtom} label="Authenticate immediately" asCheckbox containerClasses="grid-cols-[max-content_auto] gap-2" />
        <InFormRowInputWTitle stateAtom={lockAtom} label="Lock out login fields" asCheckbox containerClasses="grid-cols-[max-content_auto] gap-2" />

        <InFormRowInputWTitle stateAtom={balloonAtom} label="First login notification counter" className="!w-16" />

        <InFormRowInputWTitle stateAtom={auth_plAtom} label="Extended authentication policy">
            <ExtPolicySelect stateAtom={auth_plAtom} />
        </InFormRowInputWTitle>

        {/* <BlockWrap_Auth ctx={ctx} />
        <BlockWrap_Quicklink ctx={ctx} /> */}
        {/* <BlockWrap_Detection ctx={ctx} /> */}
        {/* <BlockWrap_Detection_Button ctx={ctx} /> */}
        {/* <BlockWrap_Icon ctx={ctx} /> */}
    </>);
}

function GroupFormCpass({ ctx }: { ctx: OFormContextProps; }) {
    return (<>
        <BlockWrap_Auth ctx={ctx} />
        <BlockWrap_Quicklink ctx={ctx} />
        {/* <BlockWrap_Detection ctx={ctx} /> */}
        {/* <BlockWrap_Detection_Button ctx={ctx} /> */}
        {/* <BlockWrap_Icon ctx={ctx} /> */}
    </>);
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?
