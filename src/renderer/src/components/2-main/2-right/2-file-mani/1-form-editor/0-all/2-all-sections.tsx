import { FormIdx } from "@/store/store-types";
import { SubSection } from "../../9-sections-ui";
import { TabFields, TabSubmit } from "../1-normal";
import { ManiAtoms, TabSectionProps } from "@/store/atoms/3-file-mani-atoms";

export function FormSections({ maniAtoms, formIdx }: { maniAtoms: ManiAtoms; formIdx: FormIdx; }) {

    const formAtoms = maniAtoms[formIdx];
    if (!formAtoms) {
        return null;
    }

    const tabSectionProps: TabSectionProps = {
        maniAtoms,
        formAtoms,
        formIdx,
    };

    return (<>
        <SubSection value="fields" label="Form fields">
            <TabFields maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        </SubSection>

        <SubSection value="submit" label="Form submit options">
            <TabSubmit maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        </SubSection>
    </>);
}
