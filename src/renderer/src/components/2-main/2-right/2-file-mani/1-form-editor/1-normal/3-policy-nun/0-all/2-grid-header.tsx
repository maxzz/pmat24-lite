import { classNames } from '@/utils';

const tableColumns = [
    ["Policy for", /**/ "Name of the field to which the policy will be applied" /*hint*/, ""           /*classes*/],
    ["Policy",     /**/ "Field policy"                                          /*hint*/, "col-span-2" /*classes*/],
] as const;

const tableHeaderClasses = "\
mb-2 px-1 text-[.65rem] \
\
text-muted-foreground border-mani-muted-foreground \
\
border-b \
select-none";

export function TableHeader() {
    return (<>
        {tableColumns.map(
            ([title, hint, classes], idx) => (
                <div className={classNames(tableHeaderClasses, classes)} title={hint} key={idx}>
                    {title}
                </div>
            ))
        }
    </>);
}
