import { type NFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { FormIdx } from '@/store/manifest';
import { FieldsGrid } from "./2-fields-grid";

export function TabFields({ ctx }: { ctx: NFormContextProps; }) {

    if (!ctx.nAllAtoms.normal.rowCtxs.length) {
        return <NoFileds formType={ctx.formIdx} />;
    }

    return (
        <div>
            <FieldsGrid ctx={ctx} />
        </div>
    );
}

function NoFileds({ formType }: { formType: FormIdx; }) {

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
