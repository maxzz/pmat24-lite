import { useState } from "react";
import { atom, useAtomValue } from "jotai";
import { RowInputAndButtonWTitle, ButtonSliders, UiAccordion } from "../9-controls";
import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { Part1General } from "../3-sections";
import { BlockDetection, BlockAuth, BlockQuicklink, BlockIcon } from "./2-all-blocks";

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
        <BlockAuth ctx={ctx} />
        <BlockQuicklink ctx={ctx} />
        <BlockDetection ctx={ctx} />
        <BlockIcon ctx={ctx} />
    </>);
}

export function GroupFormCpass({ ctx }: { ctx: OFormContextProps; }) {
    return (<>
        <BlockAuth ctx={ctx} />
        <BlockQuicklink ctx={ctx} />
        <BlockDetection ctx={ctx} />
        <BlockIcon ctx={ctx} />
    </>);
}
