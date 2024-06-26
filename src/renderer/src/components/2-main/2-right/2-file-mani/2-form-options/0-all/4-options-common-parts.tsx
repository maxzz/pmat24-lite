import { useState } from "react";
import { atom, useAtomValue } from "jotai";
import { TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { SubSectionTitle, UiAccordion } from "../9-controls";
import { appSettings } from "@/store";
import { useSnapshot } from "valtio";

export function OptionsDetection({ formAtoms }: TabSectionProps) {
    const openAtom = useState(() => atom(false))[0];
    // const open = useAtomValue(openAtom);
    
    const name = "detection";
    const formIdx = formAtoms.optionsAtoms.formIdx;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    return (<>
        <SubSectionTitle label="Screen detection" openAtom={openAtom} formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part2ScreenDetection atoms={formAtoms.optionsAtoms} />
        </UiAccordion>
    </>);
}

export function OptionsAuth({ formAtoms }: TabSectionProps) {
    const openAtom = useState(() => atom(false))[0];
    // const open = useAtomValue(openAtom);
    
    const name = "auth";
    const formIdx = formAtoms.optionsAtoms.formIdx;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    return (<>
        <SubSectionTitle label="Authentication" openAtom={openAtom} formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part3Authentication atoms={formAtoms.optionsAtoms} />
        </UiAccordion>
    </>);
}

export function OptionsQuicklink({ formAtoms }: TabSectionProps) {
    const openAtom = useState(() => atom(false))[0];
    // const open = useAtomValue(openAtom);

    const name = "ql";
    const formIdx = formAtoms.optionsAtoms.formIdx;
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];
    
    return (<>
        <SubSectionTitle label="Quick link" openAtom={openAtom}  formIdx={formIdx} name={name} />

        <UiAccordion open={open}>
            <Part4QL atoms={formAtoms.optionsAtoms} />
        </UiAccordion>
    </>);
}

export function OptionsIcon({ formAtoms }: TabSectionProps) {
    const optionsAtoms = formAtoms.optionsAtoms;

    const openAtom = useState(() => atom(false))[0];
    // const open = useAtomValue(openAtom);

    const name = "icon";
    const formIdx = formAtoms.optionsAtoms.formIdx;
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
