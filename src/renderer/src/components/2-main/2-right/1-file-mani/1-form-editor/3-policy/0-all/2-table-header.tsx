import { classNames } from '@/utils';

const tableColumns = [
    ["Field for", "Name of the field to which the policy will be applied" /*hint*/, "" /*classes*/],
    ["Policy", "Field policy" /*hint*/, "col-span-2" /*classes*/],
] as const;

const tableHeaderClasses = "\
mb-2 px-1 text-[.65rem] \
\
text-primary-400 border-primary-100 \
\
border-b \
select-none";

export function TableHeader() {
    return (<>
        {tableColumns.map(
            ([title, hint, classes], idx) => (
                <div
                    className={classNames(tableHeaderClasses, classes)}
                    title={hint} key={idx}
                >
                    {title}
                </div>
            ))
        }
    </>);
}
