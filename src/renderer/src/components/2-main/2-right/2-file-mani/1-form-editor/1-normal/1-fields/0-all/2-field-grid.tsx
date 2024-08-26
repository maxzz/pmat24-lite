import { FormAtoms } from "@/store/atoms/3-file-mani-atoms";
import { FieldRow } from "./3-field-row";
import { TableHeader, fieldsGridClasses } from "./4-table-header";

export function FieldsGrid({ formAtoms }: { formAtoms: FormAtoms; }) {
    return (
        <div className={fieldsGridClasses}>
            <TableHeader />

            {formAtoms.normal?.fieldsAtoms.map(
                (fieldRowAtoms, idx) => (
                    <FieldRow fieldRowAtoms={fieldRowAtoms} key={idx} />
                ))
            }
        </div>
    );
}
