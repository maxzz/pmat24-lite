import { useAtomValue } from "jotai";
import { TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { SubSectionTitle } from "../9-controls";

export function OptionsDetection({ formAtoms }: TabSectionProps) {
    return (<>
        <SubSectionTitle label="Screen detection" />
        <Part2ScreenDetection atoms={formAtoms.optionsAtoms} />
    </>);
}

export function OptionsAuth({ formAtoms }: TabSectionProps) {
    return (<>
        <SubSectionTitle label="Authentication" />
        <Part3Authentication atoms={formAtoms.optionsAtoms} />
    </>);
}

export function OptionsQuicklink({ formAtoms }: TabSectionProps) {
    return (<>
        <SubSectionTitle label="Quick link" />
        <Part4QL atoms={formAtoms.optionsAtoms} />
    </>);
}

export function OptionsIcon({ formAtoms }: TabSectionProps) {
    const optionsAtoms = formAtoms.optionsAtoms;

    const isWeb = useAtomValue(optionsAtoms.isWebAtom);
    if (isWeb) {
        return null;
    }

    return (<>
        <SubSectionTitle label="Password Manager Icon" />
        <Part5PasswordManagerIcon atoms={optionsAtoms} />
    </>);
}
