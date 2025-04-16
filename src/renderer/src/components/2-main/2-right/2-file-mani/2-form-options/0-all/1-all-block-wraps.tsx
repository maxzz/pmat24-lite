import { useState } from "react";
import { atom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { Part1General } from "./2-1-general";
import { Part2Authentication } from "./2-2-authentication";
import { Part3QL } from "./2-3-QL";
import { Part4ScreenDetection } from "./2-4-screen-detection";
import { Part5PasswordManagerIcon } from "./2-5-password-manager-icon";
import { ButtonSliders, OptionsSubSectionTitle, RowInputAndButtonWTitle, UiAccordion } from "../9-controls";

export function GroupManiGeneral({ ctx }: { ctx: OFormContextProps; }) {
    const openAtom = useState(() => atom(false))[0];
    const open = useAtomValue(openAtom);
    const { nameAtom } = ctx.oAllAtoms.options.p1General;
    return (<>
        <RowInputAndButtonWTitle
            label="Managed login name"
            stateAtom={nameAtom}
            button={<ButtonSliders openAtom={openAtom} />}
        />

        <UiAccordion open={open}>
            <Part1General ctx={ctx} />
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
            <Part2Authentication ctx={ctx} />
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
            <Part4ScreenDetection ctx={ctx} />
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
            <Part3QL atoms={ctx.oAllAtoms.options} />
        </UiAccordion>
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
            <Part5PasswordManagerIcon atoms={ctx.oAllAtoms.options} />
        </UiAccordion>
    </>);
}
