import { FieldTyp, Meta } from '@/store/manifest';
import { TableHeader } from './2-table-header';
import { TableRow } from './3-table-row';
import { classNames } from '@/utils';

export function ManiSection1_Fields({ fields }: { fields: Meta.Field[] | undefined; }) {
    const nonButtonFields = fields?.filter((field) => field.ftyp !== FieldTyp.button); // buttons are shown on another section
    return (<>
        {nonButtonFields?.length
            ? (
                <div className={classNames(
                    "p-2 grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-1 gap-y-1",
                    "bg-primary-800 text-primary-200 rounded-sm"
                )}>
                    <TableHeader />

                    {nonButtonFields.map((field, idx) => (
                        <TableRow field={field} key={idx} />
                    ))}
                </div>
            )
            : (
                <div>no fields</div>
            )
        }
    </>);
}
