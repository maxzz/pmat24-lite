import { useAtomValue } from "jotai";
import { ChildrenWithLabel2Cols, InputWithTitle2Cols } from "@/ui/local-ui";
import { type FileUs } from "@/store/store-types";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { ExtPolicySelect } from "../9-controls";
import { PanelTestInUse } from "./1-panel-test-inuse-state";
import { AuthImmSelect, BalloonCounterSelect } from "../9-controls/5-select-controls";

export function ManiEditorAllOptions({ fileUs }: { fileUs: FileUs; }) {
    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const [login] = maniAtoms;
    if (!login) {
        return (
            <div>
                No forms. It can be a manifest to exclude website support (It has to be no fields not forms).
            </div>
        );
    }

    const loginProps: OFormProps = { maniAtoms, oAllAtoms: { fileUsCtx: login.fileUsCtx, options: login.options } };

    return (
        <div className="ml-1 mr-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 select-none">
            <GroupFormLogin oFormProps={loginProps} />
        </div>
    );
}

function GroupFormLogin({ oFormProps }: { oFormProps: OFormProps; }) {
    const { options } = oFormProps.oAllAtoms;
    const { nameAtom, balloonAtom } = options.p1General;
    const { aimAtom, auth_plAtom } = options.p3Auth;
    return (<>
        <InputWithTitle2Cols stateAtom={nameAtom} label="Managed login name" />

        <ChildrenWithLabel2Cols label="Authenticate immediately">
            <AuthImmSelect stateAtom={aimAtom} className="w-max" />
        </ChildrenWithLabel2Cols>

        <ChildrenWithLabel2Cols label="Extended authentication policy">
            <ExtPolicySelect stateAtom={auth_plAtom} />
        </ChildrenWithLabel2Cols>

        <ChildrenWithLabel2Cols label="Show first login notification">
            <BalloonCounterSelect stateAtom={balloonAtom} className="w-max" />
        </ChildrenWithLabel2Cols>

        <PanelTestInUse oFormProps={oFormProps} />
    </>);
}

/*
export function BlockWrap_Quicklink({ oFormProps }: { oFormProps: OFormProps; }) {
    const name = "ql";
    const { formIdx } = oFormProps.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.opened[openedName(formIdx, name)];

    return (<>
        <OptionsSubSectionTitle label="Quick link" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Block3_QL atoms={oFormProps.oAllAtoms.options} />
        </UiAccordion>
    </>);
}

import { type OptionsState } from "@/store/2-file-mani-atoms";
import { InputWithTitle2Cols } from "@/ui/local-ui";

export function Block3_QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qNameAtom, qUrlAtom } = atoms.p4QL;

    return (<>
        <InputWithTitle2Cols stateAtom={qNameAtom} label="Name on the mini-dashboard" /> {/* "Name displayed on the mini-dashboard" * /}
        <InputWithTitle2Cols stateAtom={qUrlAtom} label="Quick link URL" />

        {/* No need to show checkbox. We can update checkbox by content of mini-dashboard name * /}
        {/* <InputWithTitle2Cols stateAtom={qUseAtom} label="Show on mini-dashboard" asCheckbox /> * /}
    </>);
}
*/

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?
