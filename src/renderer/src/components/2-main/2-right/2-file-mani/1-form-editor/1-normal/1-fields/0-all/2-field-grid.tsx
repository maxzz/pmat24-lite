import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { FieldRow } from "./3-field-row";
import { TableHeader, fieldsGridClasses } from "./4-table-header";

export function FieldsGrid({ ctx }: { ctx: NFormContextProps; }) {
    return (
        <div className={fieldsGridClasses}>
            <TableHeader />

            {ctx.formAtoms.normal.fieldsAtoms.map(
                (fieldRowAtoms, idx) => (
                    <FieldRow fieldRowAtoms={fieldRowAtoms} key={idx} />
                ))
            }
        </div>
    );
}
