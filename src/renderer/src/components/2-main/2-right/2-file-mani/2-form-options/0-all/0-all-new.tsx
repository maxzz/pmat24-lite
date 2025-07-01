import { useAtomValue } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type OFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { ExtPolicySelect, SectionTitle } from "../9-controls";
import { BlockWrap_Detection, BlockWrap_Auth, BlockWrap_Quicklink, BlockWrap_Icon, GroupManiGeneral } from "./1-all-block-wraps";
import { BlockWrap_Detection_Button } from "./2-4-screen-detection-btn";
import { ChildrenWithLabel2Cols, InputWithTitle2Cols, InputWithTitle2Rows } from "@/ui/local-ui";
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

    const loginProps: OFormProps | undefined = login && { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options }, formIdx: FormIdx.login };
    const cpassProps: OFormProps | undefined = cpass && { maniAtoms, oAllAtoms: { fileUsCtx: cpass.fileUsCtx, options: cpass.options }, formIdx: FormIdx.cpass };

    return (
        <div className={optionsAllGroupsClasses}>
            {loginProps && (<>
                {/* <SectionTitle label="Manifest options" /> */}
                {/* <GroupManiGeneral oFormProps={loginProps} /> */}

                {/* <SectionTitle label="Login form options" /> */}
                <GroupFormLogin oFormProps={loginProps} />
            </>)}

            {/* {cpassProps && (<>
                <SectionTitle label="Password change form options" />
                <GroupFormCpass oFormProps={cpassProps} />
            </>)} */}
        </div>
    );
}

const optionsAllGroupsClasses = "ml-1 mr-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none";

function GroupFormLogin({ oFormProps }: { oFormProps: OFormProps; }) {
    const { options } = oFormProps.oAllAtoms;
    const { nameAtom, balloonAtom } = options.p1General;
    const { aimAtom, lockAtom, auth_plAtom } = options.p3Auth;
    return (<>
        <InputWithTitle2Cols stateAtom={nameAtom} label="Managed login name" />

        <InputWithTitle2Cols stateAtom={aimAtom} label="Authenticate immediately" asCheckbox />
        <InputWithTitle2Cols stateAtom={lockAtom} label="Lock out login fields" asCheckbox />

        <ChildrenWithLabel2Cols label="Extended authentication policy">
            <ExtPolicySelect stateAtom={auth_plAtom} />
        </ChildrenWithLabel2Cols>

        <InputWithTitle2Cols stateAtom={balloonAtom} label="First login notification counter" className="!w-16" />

        {/* <BlockWrap_Auth ctx={oFormProps} /> */}
        {/* <BlockWrap_Quicklink ctx={oFormProps} /> */}

        {/* <BlockWrap_Detection ctx={oFormProps} /> */}
        {/* <BlockWrap_Detection_Button ctx={oFormProps} /> */}
        {/* <BlockWrap_Icon ctx={oFormProps} /> */}
    </>);
}

function GroupFormCpass({ oFormProps }: { oFormProps: OFormProps; }) {
    return (<>
        <BlockWrap_Auth oFormProps={oFormProps} />
        <BlockWrap_Quicklink oFormProps={oFormProps} />

        {/* <BlockWrap_Detection ctx={oFormProps} /> */}
        {/* <BlockWrap_Detection_Button ctx={oFormProps} /> */}
        {/* <BlockWrap_Icon ctx={oFormProps} /> */}
    </>);
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?
