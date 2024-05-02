import { FormIdx } from "@/store/store-types";
import { FieldsGrid } from "./2-field-grid";
import { NoFileds } from "./5-no-fileds";
import { FormAtoms, ManiAtoms } from "@/store/atoms/3-file-mani-atoms";

export function TabFields({ maniAtoms, formAtoms, formIdx }: { maniAtoms: ManiAtoms; formAtoms: FormAtoms; formIdx: FormIdx; }) {

    if (!formAtoms.fieldsAtoms.length) {
        return (
            <NoFileds formType={formIdx} />
        );
    }

    return (
        <div>
            <FieldsGrid formAtoms={formAtoms} />
        </div>
    );
}
