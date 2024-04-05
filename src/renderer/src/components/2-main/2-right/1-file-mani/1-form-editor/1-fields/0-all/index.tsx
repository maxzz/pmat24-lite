import { FormIdx, FileUs } from '@/store/store-types';
import { FieldTyp, Meta } from '@/store/manifest';
import { TableHeader } from './2-table-header';
import { TableRow } from './3-table-row';

const gridClasses = "\
p-2 \
grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center \
gap-1 \
text-primary-200 bg-primary-800 \
rounded-sm";

export function ManiSection1_Fields({ fields }: { fields: Meta.Field[] | undefined; }) {
    const nonButtonFields = fields?.filter((field) => field.ftyp !== FieldTyp.button); // buttons are shown on another section

    if (!nonButtonFields?.length) {
        return <div>no fields</div>;
    }

    return (
        <div className={gridClasses}>
            <TableHeader />

            {nonButtonFields.map(
                (field, idx) => (
                    <TableRow field={field} key={idx} />
                ))
            }
        </div>
    );
}

function NoFileds({ formType }: { formType: FormIdx; }) {
    const label = formType === FormIdx.login ? "No login form" : "No password change form";
    return (
        <div className="px-4 text-xs text-mani-title/30 select-none">
            {label}
        </div>
    );
}

export function TabFields({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    const metaForm = fileUs.meta?.[formIdx];

    if (!metaForm) {
        return <NoFileds formType={formIdx} />;
    }

    return (
        <div>
            <ManiSection1_Fields fields={metaForm.fields} />
        </div>
    );
}
