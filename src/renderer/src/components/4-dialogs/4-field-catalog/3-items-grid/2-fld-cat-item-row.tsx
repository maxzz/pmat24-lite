import { type HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { FieldTyp } from "@/store/manifest";
import { type FceCtx, type FceItem } from "@/store";
import { fieldIcons } from "@/store/manifest/manifest-field-icons";
import { classNames } from "@/utils";

type FldCatItemProps = HTMLAttributes<HTMLDivElement> & {
    idx: number;
    fceItem: FceItem;
    fceCtx: FceCtx;
};

export function FldCatItemRow({ idx, fceItem, fceCtx, className, ...rest }: FldCatItemProps) {

    const selected = useSnapshot(fceItem.editor)[fceCtx.isPicker ? 'isSelectedInDlg' : 'isSelectedInView'];
    const { displayname } = useSnapshot(fceItem.fieldValue);

    return (
        <div
            data-list-item={selected ? 'selected' : ''}
            data-list-uiid={fceItem.fceMeta.uuid}
            className={classNames(rowClasses, className)}
            {...rest}
        >
            <div className={classNames("col-start-1 pr-1.5 text-[0.65rem] text-right text-muted-foreground")}>
                {idx + 1}
            </div>

            <FieldIcon className="col-start-2 mr-1.5 size-4 opacity-50" isPsw={fceItem.fieldValue.fType === FieldTyp.psw} />

            <div className={classNames("col-start-3 truncate")}>
                {displayname}
            </div>
        </div>
    );
}

// Commom styles will be moved to common file later

const listSelectionLightClasses = "\
[--selected-fg:hsl(var(--foreground))] \
[--selected-fg-hover:hsl(var(--foreground))] \
[--selected-bg:hsl(var(--muted))] \
[--selected-bg-active:hsl(var(--accent))] \
[--selected-outline:#3b3b3b] \
";

const listSelectionDarkClasses = "\
dark:[--selected-fg:hsl(var(--foreground))] \
dark:[--selected-fg-hover:hsl(var(--foreground))] \
[--selected-bg:hsl(var(--muted))] \
dark:[--selected-bg-active:#04395e] \
dark:[--selected-outline:#007fd4] \
";

const parentActiveClasses = "\
[--parent-active:0] focus-within:[--parent-active:1] \
[--parent-selected-bg:var(--selected-bg)] focus-within:[--parent-selected-bg:var(--selected-bg-active)] \
";

export const rowParentActiveClasses = `${listSelectionLightClasses} ${listSelectionDarkClasses} ${parentActiveClasses}`;

export const rowSelectClasses = "\
data-[list-item=selected]:text-[var(--selected-fg)] hover:data-[list-item=selected]:text-[var(--selected-fg)] \
data-[list-item=selected]:bg-[var(--parent-selected-bg)] hover:data-[list-item=selected]:bg-[var(--parent-selected-bg)] \
\
data-[list-item=selected]:outline \
data-[list-item=selected]:[outline-width:calc(var(--parent-active)_*_1px)] \
data-[list-item=selected]:[outline-offset:-2px] \
outline-[var(--selected-outline)]";

// Specific to this file styles

const rowLocalClasses = "\
ml-2 mr-2 py-1 \
col-span-full grid grid-cols-subgrid items-center \
\
text-foreground bg-background \
hover:text-accent-foreground hover:bg-muted \
cursor-pointer";

const rowClasses = `${rowLocalClasses} ${rowSelectClasses}`;

function FieldIcon({ isPsw, className }: { isPsw: boolean | undefined, className: string; }) {
    const type = isPsw ? 'psw' : 'edit';
    const Icon = fieldIcons[type]?.({ className, title: `Field type: ${type}`, });
    return Icon ? Icon : <div className="text-red-500">NaN</div>;
}
