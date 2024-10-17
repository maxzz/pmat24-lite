import { CatalogItem } from "@/store/manifest";
import { rowClasses, col1Classes, col2Classes, col3Classes } from "./1-header";
// import { FieldIcon } from "./4-field-icon";
import { classNames } from "@/utils";
import { fieldIcons } from "@/store/manifest/manifest-field-icons";

const itemNormalClasses = "hover:text-primary-200";

const itemSelectedClasses = "\
text-primary-200 bg-primary-600 \
hover:text-primary-100 hover:bg-primay-400 \
rounded-sm \
transition-colors \
";

type FldCatItemProps = {
    item: CatalogItem;
    idx: number;
    selectedIdx: number;
    itemClick: (idx: number) => void;
    itemDoubleClick: () => void;
};

const row2Classes = "col-span-full grid grid-cols-subgrid";

export function FldCatItem({ item, idx, selectedIdx, itemClick, itemDoubleClick }: FldCatItemProps) {
    return (
        <div
            className={classNames(row2Classes, selectedIdx === idx ? itemSelectedClasses : itemNormalClasses)}
            onClick={() => itemClick(idx)}
            onDoubleClick={itemDoubleClick}
            key={item.uuid}
        >
            <div className={classNames("col-start-1")}>
                {idx + 1}
            </div>

            {/* <div className={classNames("col-start-2")}>
                {FieldIcon(item.password, "size-4 opacity-50")}
            </div> */}

            <FieldIcon className="size-4 opacity-50" isPsw={item.password} />

            <div className={classNames("col-start-3 whitespace-nowrap")}>
                {item.displayname}
            </div>

            {/* <div className={col4Classes}>
                {item.dbname}
            </div> */}
        </div>
    );
}

export function FieldIcon({ isPsw, className }: { isPsw: boolean | undefined, className: string; }) {
    const type = isPsw ? 'psw' : 'edit';
    const Icon =
        fieldIcons[type]?.({ className, title: `Field type: ${type}`, })
        ||
        <div className="text-red-500">NaN</div>;
    return Icon;
}
