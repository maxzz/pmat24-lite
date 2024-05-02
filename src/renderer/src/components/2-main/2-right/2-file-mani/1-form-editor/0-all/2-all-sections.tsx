import { FileUs, FormIdx } from "@/store/store-types";
import { SubSection } from "../../2-sections-ui";
import { TabFields } from "../1-fields";
import { TabSubmit } from "../2-submit";
import { TabPolicy } from "../3-policy";
import { TabOptions } from "../4-options";
import { ManiAtoms } from "@/store/atoms/3-file-mani-atoms";

export function FormSections({ maniAtoms, fileUs, formIdx }: { maniAtoms: ManiAtoms; fileUs: FileUs; formIdx: FormIdx; }) {

    const formAtoms = maniAtoms[formIdx];
    if (!formAtoms) {
        return null;
    }

    return (<>
        <SubSection value="fields" label="Form fields">
            <TabFields maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        </SubSection>

        <SubSection value="submit" label="Form submit options">
            <TabSubmit maniAtoms={maniAtoms} formAtoms={formAtoms} fileUs={fileUs} formIdx={formIdx} />
        </SubSection>

        <SubSection value="policy" label="Password policy">
            <TabPolicy maniAtoms={maniAtoms} formAtoms={formAtoms} fileUs={fileUs} formIdx={formIdx} />
        </SubSection>

        <SubSection value="options" label="Form options">
            <TabOptions maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        </SubSection>
    </>);
}
