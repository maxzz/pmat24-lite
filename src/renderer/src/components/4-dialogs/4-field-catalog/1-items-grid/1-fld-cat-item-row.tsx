import { type CatalogItem } from "@/store/manifest";
import { fieldIcons } from "@/store/manifest/manifest-field-icons";
import { classNames } from "@/utils";

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

export function FldCatItemRow({ item, idx, selectedIdx, itemClick, itemDoubleClick }: FldCatItemProps) {
    return (
        <div
            className={classNames(row2Classes, selectedIdx === idx ? itemSelectedClasses : itemNormalClasses)}
            onClick={() => itemClick(idx)}
            onDoubleClick={itemDoubleClick}
            key={item.uuid}
        >
            <div className={classNames("col-start-1 px-1 text-[0.65rem] text-center text-muted-foreground")}>
                {idx + 1}
            </div>

            <FieldIcon className="col-start-2 mr-1.5 size-4 opacity-50" isPsw={item.password} />

            <div className={classNames("col-start-3 truncate")}>
                {item.displayname}
            </div>
        </div>
    );
}

function FieldIcon({ isPsw, className }: { isPsw: boolean | undefined, className: string; }) {
    const type = isPsw ? 'psw' : 'edit';
    const Icon =
        fieldIcons[type]?.({ className, title: `Field type: ${type}`, })
        ||
        <div className="text-red-500">NaN</div>;
    return Icon;
}
