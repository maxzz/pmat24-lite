import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { classNames } from "@/utils";

export function getFieldsGridClasses(showFieldCatalog: boolean) {
    const colsClasses = showFieldCatalog
        ? "grid-cols-[auto_auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,max-content)]"
        : "grid-cols-[auto_auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,max-content)]";
    return classNames("p-2 grid items-center gap-[3px] text-foreground rounded-sm", colsClasses);
};

const headerClasses = "\
mb-1 px-1 text-[.65rem] truncate \
text-muted-foreground border-mani-muted-foreground \
border-b \
select-none";

const rowColumns = [
    ['Type',                /**/ 'The type of the field'],
    ['Use it',              /**/ 'Use this field or not'],
    ['Label',               /**/ 'The label is shown to the user next to\nthe field for entering a value'],
    ['Value',               /**/ 'Specifies the value to fill out the field\nand how it is stored'],
    ['Shared ID (Catalog)', /**/ 'The Shared ID determines whether the value\nwill be shared through the field catalog'],
    ['Policy',              /**/ 'Password policy for the field'],
];

export function TableHeader() {
    const { fcAllowed } = useSnapshot(appSettings.files.shownManis);
    const skipIdx = fcAllowed ? -1 : 4;
    return (<>
        {rowColumns.map(
            ([title, hint], idx) => {
                return (
                    skipIdx === idx
                        ? undefined
                        : (
                            <div className={headerClasses} title={hint} key={idx}>
                                {title}
                            </div>
                        )
                );
            }).filter(Boolean)
        }
    </>);
}
