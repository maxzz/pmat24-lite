import { type HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { type FceItem } from "@/store";
import { fieldIcons } from "@/store/manifest/manifest-field-icons";
import { classNames } from "@/utils";

type FldCatItemProps = HTMLAttributes<HTMLDivElement> & {
    idx: number;
    item: FceItem;
    isDlgCtx: boolean;
};

const rowClasses = "\
mx-3 1px-2 py-1 \
col-span-full grid grid-cols-subgrid items-center \
\
text-foreground bg-background \
hover:text-accent-foreground hover:bg-muted \
\
1bg-list-select-focus \
1data-[list-item=selected]:bg-list-select-selected-active \
\
data-[list-item=selected]:text-[var(--selected-fg)] hover:data-[list-item=selected]:text-[var(--selected-fg)] \
data-[list-item=selected]:bg-[var(--parent-selected-bg)] hover:data-[list-item=selected]:bg-[var(--parent-selected-bg)] \
\
data-[list-item=selected]:outline \
data-[list-item=selected]:[outline-width:calc(var(--parent-active)_*_1px)] \
data-[list-item=selected]:[outline-offset:-2px] \
outline-[var(--selected-outline)] \
rounded-[3px] \
\
cursor-default \
1data-[list-item=selected]:z-10 \
";

const rowSelectedClasses = "\
bg-red-500 \
hover:text-foreground \
rounded \
transition-colors \
";

export const leafSelectedClasses = "\
text-accent-foreground \
\
before:data-[tree-item-selected]:1border \
\
before:bg-accent \
before:opacity-100 \
before:border-l-2 \
before:border-l-accent-foreground/50 \
\
outline-primary-400 \
[outline-width:calc(var(--parent-active)_*_1px)] \
outline rounded-[3px] \
";

export function FldCatItemRow({ idx, item, isDlgCtx, className, ...rest }: FldCatItemProps) {
    const selected = useSnapshot(item.editor)[isDlgCtx ? 'selectedDlg' : 'selectedView'];
    return (
        <div
            data-list-item={selected ? 'selected' : ''}
            // {...(selected && { 'data-tree-item-selected': '' })}
            // className={classNames(rowClasses, selected && rowSelectedClasses, selected && leafSelectedClasses, className)}
            className={classNames(rowClasses, className)}
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
    const Icon = fieldIcons[type]?.({ className, title: `Field type: ${type}`, });
    return Icon ? Icon : <div className="text-red-500">NaN</div>;
}

// const rowClasses = "\
// mr-3 \
// px-2 py-1 \
// text-foreground bg-background \
// hover:text-accent-foreground hover:bg-muted \
// col-span-full grid grid-cols-subgrid items-center \
// ";

// const rowSelectedClasses = "\
// bg-red-500 \
// hover:text-foreground \
// rounded \
// transition-colors \
// ";

// export const leafSelectedClasses = "\
// text-accent-foreground \
// \
// before:data-[tree-item-selected]:1border \
// \
// before:bg-accent \
// before:opacity-100 \
// before:border-l-2 \
// before:border-l-accent-foreground/50 \
// \
// outline-primary-400 \
// [outline-width:calc(var(--parent-active)_*_1px)] \
// outline rounded-[3px] \
// ";
