import { FieldsGrid } from "./2-field-grid";
import { NoFileds } from "./5-no-fileds";
import { FormContextProps } from "@/store/atoms/3-file-mani-atoms";

export function TabFields({ formAtoms, formIdx }: FormContextProps) {

    if (!formAtoms.normal?.fieldsAtoms.length) {
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
