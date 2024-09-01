import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { FieldsGrid } from "./2-field-grid";
import { NoFileds } from "./5-no-fileds";

export function TabFields({ ctx }: { ctx: NFormContextProps; }) {

    if (!ctx.formAtoms.normal.fieldsAtoms.length) {
        return (
            <NoFileds formType={ctx.formIdx} />
        );
    }

    return (
        <div>
            <FieldsGrid ctx={ctx} />
        </div>
    );
}
