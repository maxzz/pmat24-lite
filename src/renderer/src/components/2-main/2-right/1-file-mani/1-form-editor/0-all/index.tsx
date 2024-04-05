import { FileUs, FormIdx } from "@/store/store-types";
import { FormSectionsOpenState } from "../../2-sections-ui";
import { NoForm } from "../5-no-form";
import { FormSections } from "./1-form-sections";

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
