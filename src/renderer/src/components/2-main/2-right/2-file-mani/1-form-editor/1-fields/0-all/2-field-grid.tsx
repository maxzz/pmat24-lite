import { FieldTyp, Meta } from "@/store/manifest";
import { TableHeader } from "./4-table-header";
import { FieldRow } from "./3-field-row";
import { ManiAtoms } from "../../../0-all/0-create-ui-atoms";

const gridClasses = "\
p-2 \
grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-1 \
text-foreground \
rounded-sm";

export function FieldsGrid({ maniAtoms, fields }: { maniAtoms: ManiAtoms; fields: Meta.Field[] | undefined; }) {
    const nonButtonFields = fields?.filter((field) => field.ftyp !== FieldTyp.button); // buttons are shown on another section

    if (!nonButtonFields?.length) {
        return (
            <div>no fields</div>
        );
    }

    return (
        <div className={gridClasses}>
            <TableHeader />

            {nonButtonFields.map(
                (field, idx) => (
                    <FieldRow maniAtoms={maniAtoms} field={field} key={idx} />
                ))}
        </div>
    );
}
