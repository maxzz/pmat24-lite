import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { FormSectionsAccordion, SubSection } from "./9-sections-ui";
import { TabFields, TabSubmit } from "../1-normal";

export function NormalFormTabContent({ ctx }: { ctx: NFormContextProps; }) {
    return (<>
        <div className="mr-1 h-full flex flex-col">
            <FormSectionsAccordion formIdx={ctx.formIdx}>

                <SubSection value="fields" label="Form fields">
                    <TabFields ctx={ctx} />
                </SubSection>

                <SubSection value="submit" label="Form submit options">
                    <TabSubmit ctx={ctx} />
                </SubSection>

            </FormSectionsAccordion>
        </div>
    </>);
}
