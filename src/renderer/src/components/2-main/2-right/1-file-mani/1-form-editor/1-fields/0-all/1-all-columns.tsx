import { FormIdx, FileUs } from "@/store/store-types";
import { FieldsGrid } from "./2-field-grid";
import { NoFileds } from "./5-no-fileds";

export function TabFields({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {

    const metaForm = fileUs.meta?.[formIdx];
    if (!metaForm) {
        return (
            <NoFileds formType={formIdx} />
        );
    }

    return (
        <div>
            <FieldsGrid fields={metaForm.fields} />
        </div>
    );
}
