import { useState } from "react";
import { atom, useAtomValue } from "jotai";
import { OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { RowInputAndButtonWTitle, ButtonSliders, UiAccordion } from "../9-controls";
import { Part1General } from "../3-sections";
import { OptionsDetection, OptionsAuth, OptionsQuicklink, OptionsIcon } from "./4-options-common-parts";

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

export function GroupFormLogin({ ctx }: { ctx: OFormContextProps; }) {
    return (<>
        <OptionsDetection {...ctx} />
        <OptionsAuth {...ctx} />
        <OptionsQuicklink {...ctx} />
        <OptionsIcon {...ctx} />
    </>);
}

export function GroupFormCpass({ ctx }: { ctx: OFormContextProps; }) {
    return (<>
        <OptionsDetection {...ctx} />
        <OptionsAuth {...ctx} />
        <OptionsQuicklink {...ctx} />
        <OptionsIcon {...ctx} />
    </>);
}
