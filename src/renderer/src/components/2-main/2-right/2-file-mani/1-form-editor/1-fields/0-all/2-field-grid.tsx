import { Meta } from "@/store/manifest";
import { TableHeader } from "./4-table-header";
import { FieldRow } from "./3-field-row";
import { FormAtoms } from "../../../0-all/0-create-ui-atoms";

const gridClasses = "\
p-2 \
grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-1 \
text-foreground \
rounded-sm";

export function FieldsGrid({ formAtoms }: { formAtoms: FormAtoms; }) {
    // const nonButtonFields = fields?.filter((field) => field.ftyp !== FieldTyp.button); // buttons are shown on another section

    // if (!nonButtonFields?.length) {
    //     return (
    //         <div>no fields</div>
    //     );
    // }

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
            {/* {nonButtonFields.map(
                (field, idx) => (
                    <FieldRow fieldRowAtoms={fieldRowAtoms} field={field} key={idx} />
                ))} */}
        </div>
    );
}
