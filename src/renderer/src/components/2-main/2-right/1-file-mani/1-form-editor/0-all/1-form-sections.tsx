import { FileUs, FormIdx } from "@/store/store-types";
import { SubSection } from "../../2-sections-ui";
import { TabFields } from "../1-fields";
import { TabSubmit } from "../2-submit";
import { TabPolicy } from "../3-policy";
import { TabOptions } from "../4-options";

export function FormSections({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    return (<>
        <SubSection value="fields" label="Fields">
            <TabFields fileUs={fileUs} formIdx={formIdx} />
        </SubSection>

        <SubSection value="submit" label="Submit options">
            <TabSubmit fileUs={fileUs} formIdx={formIdx} />
        </SubSection>

        <SubSection value="policy" label="Policy">
            <TabPolicy fileUs={fileUs} formIdx={formIdx} />
        </SubSection>

        <SubSection value="options" label="Form options">
            <TabOptions fileUs={fileUs} formIdx={formIdx} />
        </SubSection>
    </>);
}

// const title = formIdx === 0 ? 'Login' : 'Password change';
// const formMeta = fileUs.meta?.[formIdx];
//         {/* Form {title} */}
//         {/* {formMeta?.disp?.domain} */}
