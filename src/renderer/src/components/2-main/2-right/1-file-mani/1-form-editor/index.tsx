import { FileUs, FormIdx } from "@/store/store-types";
import { FormSectionsOpenState, SubSection } from "../2-sections-ui/2-subsection";
import { LongPanel } from "../../9-nun/LongPanel";

function FormSections() {
    return (<>
        <SubSection value="fields" label="Fields">
            <LongPanel />
        </SubSection>

        <SubSection value="submit" label="Submit options">
            <LongPanel />
        </SubSection>

        <SubSection value="policy" label="Policy">
            <LongPanel />
        </SubSection>

        <SubSection value="options" label="Form options">
            <LongPanel />
        </SubSection>
    </>);
}

export function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    const formMeta = fileUs.meta?.[formIdx];

    return (
        <div className="flex flex-col">
            {/* Form {title} */}
            {/* {formMeta?.disp?.domain} */}

            <FormSectionsOpenState formIdx={formIdx}>
                <FormSections />
            </FormSectionsOpenState>
        </div>
    );
}
