import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { FormIdx } from '@/store/manifest';
import { FieldRow } from "./2-field-row";
import { TableHeader, fieldsGridClasses } from "./3-fields-header";

export function TabFields({ ctx }: { ctx: NFormContextProps; }) {

    if (!ctx.nAllAtoms.normal.rowCtxs.length) {
        return <NoFields formType={ctx.formIdx} />;
    } else {
        return <FieldsGrid ctx={ctx} />;
    }
}

function FieldsGrid({ ctx }: { ctx: NFormContextProps; }) {
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

function NoFields({ formType }: { formType: FormIdx; }) {

    const label =
        formType === FormIdx.login
            ? "No login form"
            : "No password change form";

    return (
        <div className="px-4 text-xs text-mani-title/30 select-none">
            {label}
        </div>
    );
}
