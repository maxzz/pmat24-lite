import { useSetAtom } from "jotai";
import * as Menu from "@radix-ui/react-dropdown-menu";
import { type ChunkKey } from "@/store/manifest";
import { doCreateItemAtom, type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { RowColumnIcon, rowColumnName } from "./1-row-parts";
import { focusClasses, menuContentClasses, menuItemClasses } from "../8-manual-shared-styles";
import { IconAdd } from "@/ui/icons";
import { classNames } from "@/utils";

function MenuRow({ ctx, type, password }: { ctx: MFormContextProps; type: ChunkKey; password?: boolean; }) {
    const doCreateItem = useSetAtom(doCreateItemAtom);
    const dispName = rowColumnName(type);
    return (
        <Menu.Item
            className={classNames(menuItemClasses, "text-xs grid grid-cols-[auto,1fr] gap-x-2 items-center")}
            onClick={() => doCreateItem(ctx.mAllAtoms.manual, type, !!password)}
        >
            <RowColumnIcon type={type} />

            <div>
                {dispName}
            </div>
        </Menu.Item>
    );
}

const buttonClasses = "\
w-7 h-6 \
hover:bg-primary-200 dark:hover:bg-primary-700 \
border-muted-foreground/20 \
border rounded outline-none \
shadow-sm dark:shadow-primary-900 \
grid place-items-center";

export function MenuAddButton({ ctx }: { ctx: MFormContextProps; }) {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <button className={classNames(buttonClasses, focusClasses)}>
                    <IconAdd className="size-3" />
                </button>
            </Menu.Trigger>

            <Menu.Portal container={document.getElementById('portal')}>
                <Menu.Content className={menuContentClasses} sideOffset={1} alignOffset={-8} side="bottom" align="end">
                    <MenuRow ctx={ctx} type="kbd" />
                    <MenuRow ctx={ctx} type="pos" />
                    <MenuRow ctx={ctx} type="fld" />
                    <MenuRow ctx={ctx} type="dly" />
                </Menu.Content>
            </Menu.Portal>
        </Menu.Root>
    );
}
