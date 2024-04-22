import { FileUs, FormIdx } from "@/store/store-types";
import { FormSectionsOpenState } from "../../2-sections-ui";
import { FormSections } from "./1-form-sections";
import { NoForm } from "./2-no-form";

export function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    const hasForm = fileUs.meta?.[formIdx];
    
    if (!hasForm) {
        return <NoForm formType={formIdx} />;
    }
    
    return (
        <div className="mr-1 h-full flex flex-col">

            <FormSectionsOpenState formIdx={formIdx}>
                <FormSections fileUs={fileUs} formIdx={formIdx} />
            </FormSectionsOpenState>
        </div>
    );
}
