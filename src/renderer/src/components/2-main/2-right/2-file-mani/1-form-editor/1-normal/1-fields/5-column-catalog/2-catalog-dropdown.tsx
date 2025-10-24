import { type JSX } from "react";
import { classNames } from "@/utils";
import * as menu from "@radix-ui/react-dropdown-menu";
import { SymbolChevronDown, SymbolDot } from "@ui/icons";

const menuContentClasses = "\
py-1 max-h-[50vh] \
\
text-popover-foreground bg-popover \
\
border-mani-border border \
\
radix-side-top:animate-slide-up \
radix-side-bottom:animate-slide-down \
\
rounded-lg shadow-md \
\
overflow-auto smallscroll smallscroll-light \
\
grid grid-cols-1"; //TODO: maybe have a separate popop for big list and add search; or simplescroll; more fields.. put on top?; scroll to view;

const menuItemClasses = "\
relative mx-1 pl-7 pr-4 py-1.5 text-xs \
\
text-accent-foreground \
\
focus:text-accent-foreground \
focus:bg-accent \
\
rounded-md outline-hidden select-none cursor-default \
\
flex items-center";

type CatalogDropdownProps = {
    items: string[];
    selectedIndex: number;
    onSetIndex: (idx: number) => void;
};

export function CatalogDropdown({ items, selectedIndex, onSetIndex }: CatalogDropdownProps) {
    return (
        <menu.Root>
            <menu.Trigger asChild>
                <button className="px-1.5 border-mani-border-separator border-l outline-hidden group/btn">
                    <SymbolChevronDown className="size-4 border-primary-500 rounded group-focus-within/btn:border" />
                </button>
            </menu.Trigger>

            <menu.Portal>
                <menu.Content className={menuContentClasses} sideOffset={4} align="end">
                    {items.map((item, idx) => (
                        <CatalogMenuItem item={item} idx={idx} selectedIndex={selectedIndex} onSetIndex={onSetIndex} key={idx} />
                    ))}
                </menu.Content>
            </menu.Portal>
        </menu.Root>
    );
}

type CatalogMenuItemProps = {
    item: string;
    idx: number;
    selectedIndex: number;
    onSetIndex: (idx: number) => void;
};

function CatalogMenuItem({ item, idx, selectedIndex, onSetIndex }: CatalogMenuItemProps): JSX.Element {
    const isSelected = idx === selectedIndex;
    const isSeparator = item === '-';
    if (isSeparator) {
        return <menu.Separator className="my-1 h-px bg-mani-border" key={idx} />;
    }
    return (
        <menu.Item className={classNames(menuItemClasses, isSelected && "bg-accent")} onSelect={() => onSetIndex(idx)} key={idx}>
            {isSelected && (
                <SymbolDot className={`absolute left-1.5 size-5 fill-foreground`} />
            )}

            <span className="grow">
                {item}
            </span>
        </menu.Item>
    );
}
