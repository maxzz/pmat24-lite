import { useAtomValue } from "jotai";
import { TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { Part2ScreenDetection, Part3Authentication, Part4QL, Part5PasswordManagerIcon } from "../3-sections";
import { SubSectionTitle } from "../9-controls";

export function GroupLogin({ formAtoms }: TabSectionProps) {

    const optionsAtoms = formAtoms.optionsAtoms;
    const isWeb = useAtomValue(optionsAtoms.isWebAtom);

    return (<>
        <SubSectionTitle label="Screen detection" />
        <Part2ScreenDetection atoms={optionsAtoms} />

        <SubSectionTitle label="Authentication" />
        <Part3Authentication atoms={optionsAtoms} />

        <SubSectionTitle label="Quick link" />
        <Part4QL atoms={optionsAtoms} />

        {!isWeb && (<>
            <SubSectionTitle label="Password Manager Icon" />
            <Part5PasswordManagerIcon atoms={optionsAtoms} />
        </>)}
    </>);
}
