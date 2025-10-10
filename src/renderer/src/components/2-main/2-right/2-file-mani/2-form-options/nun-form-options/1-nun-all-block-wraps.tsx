import { useState } from "react";
import { atom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings, openedName } from "@/store/9-ui-state";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { Block1_General } from "./2-nun-1-general";
import { Block2_Authentication } from "./2-nun-2-authentication";
import { Block3_QL } from "./2-nun-3-QL";
import { Block4_ScreenDetection } from "./2-nun-4-screen-detection";
import { Block5_PMIcon } from "./2-nun-5-pm-icon";
import { ButtonSliders, OptionsSubSectionTitle, UiAccordion } from "../9-controls";
import { UiAccordion2 } from "../9-controls/nun-controls/ui-accordion2";
import { ChildrenWithLabel2Cols, InputOrCheckWithErrorMsg } from "@/ui/local-ui";

export function GroupManiGeneral({ oFormProps }: { oFormProps: OFormProps; }) {
    const openAtom = useState(() => atom(false))[0];
    const open = useAtomValue(openAtom);
    const { nameAtom } = oFormProps.oAllAtoms.options.p1General;
    return (<>
        <ChildrenWithLabel2Cols label="Managed login name">
            <div className="w-full flex items-center justify-between gap-1">
                <InputOrCheckWithErrorMsg stateAtom={nameAtom} />
                <ButtonSliders openAtom={openAtom} />
            </div>
        </ChildrenWithLabel2Cols>

        <UiAccordion open={open}>
            <Block1_General oFormProps={oFormProps} />
        </UiAccordion>
    </>);
}

export function BlockWrap_Auth({ oFormProps }: { oFormProps: OFormProps; }) {
    const name = "auth";
    const { formIdx } = oFormProps.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.opened[openedName(formIdx, name)];

    return (<>
        <OptionsSubSectionTitle label="Authentication" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Block2_Authentication oFormProps={oFormProps} />
        </UiAccordion>
    </>);
}

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

export function BlockWrap_Detection({ oFormProps }: { oFormProps: OFormProps; }) {
    const name = "detection";
    const { formIdx } = oFormProps.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.opened[openedName(formIdx, name)];

    return (<>
        <OptionsSubSectionTitle label="Screen detection" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Block4_ScreenDetection oFormProps={oFormProps} />
        </UiAccordion>

        {/* <UiAccordion2>
            <Block4_ScreenDetection oFormProps={oFormProps} />
        </UiAccordion2> */}
    </>);
}

export function BlockWrap_IconPosition({ oFormProps }: { oFormProps: OFormProps; }) {
    const name = "icon";
    const { formIdx, isWebAtom } = oFormProps.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.opened[openedName(formIdx, name)];

    const isWeb = useAtomValue(isWebAtom);
    if (isWeb) {
        return null;
    }

    return (<>
        <OptionsSubSectionTitle label="Password Manager Icon" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Block5_PMIcon atoms={oFormProps.oAllAtoms.options} />
        </UiAccordion>
    </>);
}
