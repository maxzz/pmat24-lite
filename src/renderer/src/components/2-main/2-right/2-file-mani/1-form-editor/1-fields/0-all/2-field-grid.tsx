import { FormAtoms } from "../../../0-all/0-create-ui-atoms";
import { FieldRow } from "./3-field-row";
import { TableHeader } from "./4-table-header";

const gridClasses = "\
p-2 \
grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-1 \
text-foreground \
rounded-sm";

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
