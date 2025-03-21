import { useSnapshot } from "valtio";
import { appSettings } from "@/store";

export function getFieldsGridClasses(showFieldCatalog: boolean) {
    return (
        showFieldCatalog ?
            "\
p-2 \
grid grid-cols-[auto_auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,max-content)] items-center gap-[3px] \
text-foreground \
rounded-sm"
            :
            "\
p-2 \
grid grid-cols-[auto_auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,max-content)] items-center gap-[3px] \
text-foreground \
rounded-sm"
    );
};

const headerClasses = "\
mb-2 px-1 text-[.65rem] truncate \
text-muted-foreground border-mani-muted-foreground \
border-b \
select-none";

const rowColumns = [
    ['Type',                /**/ 'Type of field'],
    ['Use it',              /**/ 'Use this field or not'],
    ['Label',               /**/ 'The label is shown to the user next to\nthe field for entering a value'],
    ['Value',               /**/ 'Specifies the value to fill out the field\nand how it is stored'],
    ['Shared ID (Catalog)', /**/ 'The Shared ID determines whether the value\nwill be shared through the field catalog'],
    ['Policy',              /**/ 'Password policy for the field'],
];

export function TableHeader() {
    const { showFieldCatalog } = useSnapshot(appSettings.appUi.uiAdvanced);
    const skipIdx = showFieldCatalog ? -1 : 4;
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
