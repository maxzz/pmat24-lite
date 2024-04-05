import { FileUs, FormIdx } from "@/store/store-types";
import { FormSectionsOpenState, SubSection } from "../2-sections-ui";
import { TabFields } from "./1-fields";
import { TabSubmit } from "./2-submit";
import { TabPolicy } from "./3-policy";
import { TabOptions } from "./4-options";

function FormSections({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
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

function NoForm({ formType }: { formType: FormIdx; }) {
    const label = formType === FormIdx.login ? "No login form" : "No password change form";
    return (
        <div className="h-full flex items-center justify-center">
            <div className="px-4 text-xs text-mani-title/30 select-none">
                {label}
            </div>
        </div>
    );
}

export function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    const hasForm = fileUs.meta?.[formIdx];
    if (!hasForm) {
        return <NoForm formType={formIdx} />;
    }
    return (
        <div className="h-full flex flex-col">

            <FormSectionsOpenState formIdx={formIdx}>
                <FormSections fileUs={fileUs} formIdx={formIdx} />
            </FormSectionsOpenState>
        </div>
    );
}

// const title = formIdx === 0 ? 'Login' : 'Password change';
// const formMeta = fileUs.meta?.[formIdx];
//         {/* Form {title} */}
//         {/* {formMeta?.disp?.domain} */}
