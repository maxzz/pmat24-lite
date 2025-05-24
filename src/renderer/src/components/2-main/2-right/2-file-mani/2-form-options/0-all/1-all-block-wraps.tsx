import { useState } from "react";
import { atom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { Block1_General } from "./2-1-general";
import { Block2_Authentication } from "./2-2-authentication";
import { Block3_QL } from "./2-3-QL";
import { Block4_ScreenDetection } from "./2-4-screen-detection";
import { Block5_PMIcon } from "./2-5-pm-icon";
import { ButtonSliders, OptionsSubSectionTitle, UiAccordion } from "../9-controls";
import { UiAccordion2 } from "../9-controls/nun/ui-accordion2";
import { ChildrenWithLabel2Cols, InputOrCheckWithErrorMsg } from "@/ui/local-ui";

export function GroupManiGeneral({ ctx }: { ctx: OFormContextProps; }) {
    const openAtom = useState(() => atom(false))[0];
    const open = useAtomValue(openAtom);
    const { nameAtom } = ctx.oAllAtoms.options.p1General;
    return (<>
        <ChildrenWithLabel2Cols label="Managed login name">
            <div className="w-full flex items-center justify-between gap-1">
                <InputOrCheckWithErrorMsg stateAtom={nameAtom} />
                <ButtonSliders openAtom={openAtom} />
            </div>
        </ChildrenWithLabel2Cols>

        <UiAccordion open={open}>
            <Block1_General ctx={ctx} />
        </UiAccordion>
    </>);
}

export function BlockWrap_Auth({ ctx }: { ctx: OFormContextProps; }) {
    const name = "auth";
    const { formIdx } = ctx.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    return (<>
        <OptionsSubSectionTitle label="Authentication" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Block2_Authentication ctx={ctx} />
        </UiAccordion>
    </>);
}

export function BlockWrap_Quicklink({ ctx }: { ctx: OFormContextProps; }) {
    const name = "ql";
    const { formIdx } = ctx.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    return (<>
        <OptionsSubSectionTitle label="Quick link" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Block3_QL atoms={ctx.oAllAtoms.options} />
        </UiAccordion>
    </>);
}

export function BlockWrap_Detection({ ctx }: { ctx: OFormContextProps; }) {
    const name = "detection";
    const { formIdx } = ctx.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    return (<>
        <OptionsSubSectionTitle label="Screen detection" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Block4_ScreenDetection ctx={ctx} />
        </UiAccordion>

        {/* <UiAccordion2>
            <Block4_ScreenDetection ctx={ctx} />
        </UiAccordion2> */}
    </>);
}

export function BlockWrap_Icon({ ctx }: { ctx: OFormContextProps; }) {
    const name = "icon";
    const { formIdx, isWebAtom } = ctx.oAllAtoms.options;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    const isWeb = useAtomValue(isWebAtom);
    if (isWeb) {
        return null;
    }

    return (<>
        <OptionsSubSectionTitle label="Password Manager Icon" formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Block5_PMIcon atoms={ctx.oAllAtoms.options} />
        </UiAccordion>
    </>);
}
