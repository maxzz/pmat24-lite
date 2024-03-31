import { FileUs, FormIdx } from "@/store/store-types";
import { FormSections } from "../3-sections-ui-2/3-subsection";

export function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    const formMeta = fileUs.meta?.[formIdx];

    return (
        <div className="flex flex-col">
            {/* Form {title} */}
            {/* {formMeta?.disp?.domain} */}

            <FormSections formIdx={formIdx} />
        </div>
    );
}
