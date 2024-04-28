import { FormIdx, FileUs } from "@/store/store-types";
import { FieldsGrid } from "./2-field-grid";
import { NoFileds } from "./5-no-fileds";
import { ManiAtoms } from "../../../0-all/0-create-ui-atoms/9-types";

export function TabFields({ maniAtoms, fileUs, formIdx }: { maniAtoms: ManiAtoms; fileUs: FileUs; formIdx: FormIdx; }) {

    const metaForm = fileUs.meta?.[formIdx];
    if (!metaForm) {
        return (
            <NoFileds formType={formIdx} />
        );
    }

    return (
        <div>
            <FieldsGrid maniAtoms={maniAtoms} fields={metaForm.fields} />
        </div>
    );
}
