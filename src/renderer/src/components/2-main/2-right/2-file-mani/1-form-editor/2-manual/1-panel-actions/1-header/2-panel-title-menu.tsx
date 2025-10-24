import { classNames } from "@/utils";
import { IconAdd } from "@/ui/icons";
import { type ChunkKey } from "@/store/manifest";
import { type CreateNewManualAction } from "../0-all/9-types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { focusClasses, menuItemClasses } from "../../8-manual-shared-styles";
import { RowColumnIcon, rowColumnActionName } from "../3-row-details";

export function ButtonActionsMenuAdd({ addNew }: { addNew: CreateNewManualAction; }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={classNames(buttonClasses, focusClasses)} tabIndex={-1}>
                    <IconAdd className="size-3" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuPortal /*container={document.getElementById('portal')}*/>
                <DropdownMenuContent sideOffset={1} alignOffset={-8} side="bottom" align="end">
                    <MenuRow type="kbd" addNew={addNew} />
                    <MenuRow type="pos" addNew={addNew} />
                    <MenuRow type="fld" addNew={addNew} />
                    <MenuRow type="dly" addNew={addNew} />
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}

function MenuRow({ type, password, addNew }: { type: ChunkKey; password?: boolean; addNew: CreateNewManualAction; }) {
    const dispName = rowColumnActionName(type);
    return (
        <DropdownMenuItem
            className={classNames(menuItemClasses, "text-xs grid grid-cols-[auto_1fr] gap-x-2 items-center")}
            onClick={(event) => addNew({ type, password, event })}
        >
            <RowColumnIcon type={type} />

            <div>
                {dispName}
            </div>
        </DropdownMenuItem>
    );
}

const buttonClasses = "\
mr-3 size-5 \
hover:bg-primary-200 dark:hover:bg-primary-700 \
border-muted-foreground/10 dark:border-muted-foreground/30 \
border rounded outline-hidden \
shadow-xs dark:shadow-foreground/20 \
grid place-items-center";
