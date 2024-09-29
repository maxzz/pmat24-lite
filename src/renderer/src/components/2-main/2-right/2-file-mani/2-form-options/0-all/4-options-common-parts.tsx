import { useState } from "react";
import { atom, useAtomValue } from "jotai";
import { OFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { SubSectionTitle, UiAccordion } from "../9-controls";
import { appSettings } from "@/store";
import { useSnapshot } from "valtio";

export function OptionsDetection(ctx: OFormContextProps) {
    const openAtom = useState(() => atom(false))[0];
    // const open = useAtomValue(openAtom);
    
    const name = "detection";
    const formIdx = ctx.oFormAtoms.options.formIdx;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    return (<>
        <SubSectionTitle label="Screen detection" openAtom={openAtom} formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part2ScreenDetection ctx={ctx} />
        </UiAccordion>
    </>);
}

export function OptionsAuth(ctx: OFormContextProps) {
    const openAtom = useState(() => atom(false))[0];
    // const open = useAtomValue(openAtom);
    
    const name = "auth";
    const formIdx = ctx.oFormAtoms.options.formIdx;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    return (<>
        <SubSectionTitle label="Authentication" openAtom={openAtom} formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part3Authentication ctx={ctx} />
        </UiAccordion>
    </>);
}

export function OptionsQuicklink(ctx: OFormContextProps) {
    const openAtom = useState(() => atom(false))[0];
    // const open = useAtomValue(openAtom);

    const name = "ql";
    const formIdx = ctx.oFormAtoms.options.formIdx;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];
    
    return (<>
        <SubSectionTitle label="Quick link" openAtom={openAtom}  formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part4QL atoms={ctx.oFormAtoms.options} />
        </UiAccordion>
    </>);
}

export function OptionsIcon(ctx: OFormContextProps) {
    const optionsAtoms = ctx.oFormAtoms.options;

    const openAtom = useState(() => atom(false))[0];
    // const open = useAtomValue(openAtom);

    const name = "icon";
    const formIdx = ctx.oFormAtoms.options.formIdx;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    const isWeb = useAtomValue(optionsAtoms.isWebAtom);
    if (isWeb) {
        return null;
    }

    return (<>
        <SubSectionTitle label="Password Manager Icon" openAtom={openAtom} formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part5PasswordManagerIcon atoms={optionsAtoms} />
        </UiAccordion>
    </>);
}
