import { TabSectionProps } from "@/store/atoms/3-file-mani-atoms";
import { Part1General } from "../3-sections";
import { SubSectionTitle, SubSectionTitle0 } from "../9-controls";

export function GroupGeneral({ formAtoms }: TabSectionProps) {
    const optionsAtoms = formAtoms.optionsAtoms;
    return (<>
        <SubSectionTitle0 label="General" />
        <Part1General atoms={optionsAtoms} />
    </>);
}
