import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { FieldRow } from "./3-field-row";
import { TableHeader, fieldsGridClasses } from "./4-table-header";

export function FieldsGrid({ ctx }: { ctx: NFormContextProps; }) {
    return (
        <div className={fieldsGridClasses}>
            <TableHeader />

            {ctx.nAllAtoms.normal.rowCtxs.map(
                (fieldRowAtoms, idx) => (
                    <FieldRow rowCtx={fieldRowAtoms} fileUsCtx={ctx.nAllAtoms.fileUsCtx} key={idx} />
                ))
            }
        </div>
    );
}
