import { FormAtoms } from "@/store/atoms/3-file-mani-atoms";
import { FieldRow } from "./3-field-row";
import { TableHeader, gridClasses } from "./4-table-header";

export function FieldsGrid({ formAtoms }: { formAtoms: FormAtoms; }) {

    if (!formAtoms.fieldsAtoms.length) {
        return (
            <div>no fields</div>
        );
    }

    return (
        <div className={gridClasses}>
            <TableHeader />

            {formAtoms.fieldsAtoms.map(
                (fieldRowAtoms, idx) => (
                    <FieldRow fieldRowAtoms={fieldRowAtoms} key={idx} />
                ))
            }
        </div>
    );
}
