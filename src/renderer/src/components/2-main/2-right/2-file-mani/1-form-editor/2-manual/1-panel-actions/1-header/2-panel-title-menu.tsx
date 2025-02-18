import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { IconAdd } from "@/ui/icons";
import { type ChunkKey } from "@/store/manifest";
import * as Menu from "@radix-ui/react-dropdown-menu";
import { focusClasses, menuContentClasses, menuItemClasses } from "../../8-manual-shared-styles";
import { doCreateItemAtom, type MFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { RowColumnIcon, rowColumnName } from "../3-row-details";

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
mr-2.5 size-6 \
hover:bg-primary-200 dark:hover:bg-primary-700 \
border-muted-foreground/20 \
border rounded outline-none \
shadow-sm dark:shadow-primary-900 \
grid place-items-center";
