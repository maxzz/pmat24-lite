import { FormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { FormSectionsAccordion, SubSection } from "../../9-sections-ui";
import { TabFields, TabSubmit } from "../1-normal";

export function NormalFormTabContent({ maniAtoms, formAtoms, formIdx }: FormContextProps) {
    return (<>
        <FormSectionsAccordion formIdx={formIdx}>

            <SubSection value="fields" label="Form fields">
                <TabFields maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
            </SubSection>

            <SubSection value="submit" label="Form submit options">
                <TabSubmit maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
            </SubSection>

        </FormSectionsAccordion>
    </>);
}
