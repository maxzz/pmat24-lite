import { FieldTyp, Meta } from '@/store/manifest';
import { TableHeader } from './2-table-header';
import { TableRow } from './4-table-row';

const gridClasses = "\
p-2 \
grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-1 \
text-foreground \
rounded-sm";

export function ManiSection1_Fields({ fields }: { fields: Meta.Field[] | undefined; }) {
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
                    <TableRow field={field} key={idx} />
                ))}
        </div>
    );
}
