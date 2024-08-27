import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { FieldsGrid } from "./2-field-grid";
import { NoFileds } from "./5-no-fileds";

export function TabFields({ formAtoms, formIdx }: NFormContextProps) {

    if (!formAtoms.normal.fieldsAtoms.length) {
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
