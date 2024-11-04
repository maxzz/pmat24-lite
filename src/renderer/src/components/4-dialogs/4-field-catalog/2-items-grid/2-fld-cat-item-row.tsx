import { type HTMLAttributes } from "react";
import { type CatalogItem } from "@/store/manifest";
import { fieldIcons } from "@/store/manifest/manifest-field-icons";
import { classNames } from "@/utils";
import { useSnapshot } from "valtio";

type FldCatItemProps = HTMLAttributes<HTMLDivElement> & {
    item: CatalogItem;
    idx: number;
    selectedIdx: number;
};

const rowClasses = "\
px-2 py-1 \
text-foreground bg-background \
hover:text-accent-foreground hover:bg-muted \
col-span-full grid grid-cols-subgrid items-center \
";

const rowSelectedClasses = "\
hover:text-foreground \
rounded \
transition-colors \
";

export function FldCatItemRow({ item, idx, selectedIdx, ...rest }: FldCatItemProps) {
    const { selected } = useSnapshot(item.editor);
    return (
        <div
            className={classNames(rowClasses, selected && rowSelectedClasses)}
            {...rest}
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
