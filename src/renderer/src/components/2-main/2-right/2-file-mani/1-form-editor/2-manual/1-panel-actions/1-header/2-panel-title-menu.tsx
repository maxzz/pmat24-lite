import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { IconAdd } from "@/ui/icons";
import { type ChunkKey } from "@/store/manifest";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { focusClasses, menuItemClasses } from "../../8-manual-shared-styles";
import { doCreateItemAtom, type MFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { RowColumnIcon, rowColumnName } from "../3-row-details";

export function ButtonActionsMenuAdd({ ctx }: { ctx: MFormContextProps; }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={classNames(buttonClasses, focusClasses)} tabIndex={-1}>
                    <IconAdd className="size-3" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuPortal /*container={document.getElementById('portal')}*/>
                <DropdownMenuContent className={"1z-[52]"} sideOffset={1} alignOffset={-8} side="bottom" align="end">
                    <MenuRow ctx={ctx} type="kbd" />
                    <MenuRow ctx={ctx} type="pos" />
                    <MenuRow ctx={ctx} type="fld" />
                    <MenuRow ctx={ctx} type="dly" />
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}

function MenuRow({ ctx, type, password }: { ctx: MFormContextProps; type: ChunkKey; password?: boolean; }) {
    const doCreateItem = useSetAtom(doCreateItemAtom);
    const dispName = rowColumnName(type);
    return (
        <DropdownMenuItem
            className={classNames(menuItemClasses, "text-xs grid grid-cols-[auto,1fr] gap-x-2 items-center")}
            onClick={() => doCreateItem(ctx.mAllAtoms.manual, type, !!password)}
        >
            <RowColumnIcon type={type} />

            <div>
                {dispName}
            </div>
        </DropdownMenuItem>
    );
}

const buttonClasses = "\
mr-2.5 size-6 \
hover:bg-primary-200 dark:hover:bg-primary-700 \
border-muted-foreground/20 \
border rounded outline-none \
shadow-sm dark:shadow-primary-900 \
grid place-items-center";
