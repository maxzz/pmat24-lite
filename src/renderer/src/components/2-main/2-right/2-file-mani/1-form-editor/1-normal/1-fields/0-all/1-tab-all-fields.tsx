import { FieldsGrid } from "./2-field-grid";
import { NoFileds } from "./5-no-fileds";
import { TabSectionProps } from "@/store/atoms/3-file-mani-atoms";

export function TabFields({ formAtoms, formIdx }: TabSectionProps) {

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
