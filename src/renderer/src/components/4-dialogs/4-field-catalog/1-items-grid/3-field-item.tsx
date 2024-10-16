import { CatalogItem } from "@/store/manifest";
import { rowClasses, col1Classes, col2Classes, col3Classes, col4Classes } from "./1-header";
import { FieldIcon } from "./4-field-icon";
import { classNames } from "@/utils";

type FldCatItemProps = {
    item: CatalogItem;
    idx: number;
    selectedIdx: number;
    itemClick: (idx: number) => void;
    itemDoubleClick: () => void;
};

const itemNormalClasses = "hover:text-primary-200";
const itemSelectedClasses = "text-primary-200 bg-primary-600 rounded-sm hover:text-primary-100 hover:bg-primay-400 transition-colors";

export function FldCatItem({ item, idx, selectedIdx, itemClick, itemDoubleClick }: FldCatItemProps) {
    return (
        <div
            className={classNames(rowClasses, "cursor-default select-none", selectedIdx === idx ? itemSelectedClasses : itemNormalClasses)}
            onClick={() => itemClick(idx)}
            onDoubleClick={itemDoubleClick}
            key={item.uuid}
        >
            <div className={col1Classes}>
                {idx + 1}
            </div>

            <div className={col2Classes}>
                {FieldIcon(item.password, "size-4 opacity-50")}
            </div>

            <div className={`${col3Classes} whitespace-nowrap`}>
                {item.displayname}
            </div>

            <div className={col4Classes}>
                {item.dbname}
            </div>
        </div>
    );
}
