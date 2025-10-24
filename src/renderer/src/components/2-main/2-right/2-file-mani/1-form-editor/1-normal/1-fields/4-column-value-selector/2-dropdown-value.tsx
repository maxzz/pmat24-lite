import { type PrimitiveAtom } from "jotai";
import * as M from "@radix-ui/react-dropdown-menu";
import { SymbolChevronDown, SymbolDot } from "@ui/icons";
import { classNames } from "@/utils";

type DropdownValueProps = {
    useItAtom: PrimitiveAtom<boolean>;
    items: string[];
    selectedIndex: number;
    onSetIndex: (idx: number) => void;
};

export function DropdownValue({ useItAtom, items, selectedIndex, onSetIndex }: DropdownValueProps) {
    return (
        <M.Root>
            <M.Trigger asChild>
                <button className="px-1.5 border-mani-border-separator border-l outline-hidden group/btn">
                    <SymbolChevronDown className="size-4 border-muted-foreground rounded group-focus-within/btn:border" />
                </button>
            </M.Trigger>

            <M.Portal>
                <M.Content className={menuContentClasses} sideOffset={4} align="end" >
                    {items.map(
                        (item, idx) => <MenuItemValue item={item} idx={idx} selectedIndex={selectedIndex} onSetIndex={onSetIndex} key={idx} />
                    )}
                </M.Content>
            </M.Portal>
        </M.Root>
    );
}

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
grid grid-cols-1 \
z-51"; // dialog has z-index 50, so we need to be higher
//TODO: maybe have a separate popop for big list and add search; or simplescroll; more fields.. put on top?; scroll to view;

type MenuItemValueProps = {
    item: string;
    idx: number;
    selectedIndex: number;
    onSetIndex: (idx: number) => void;
};

function MenuItemValue({ item, idx, selectedIndex, onSetIndex }: MenuItemValueProps) {
    const isSelected = selectedIndex === idx;

    const isSeparator = item === '-';
    if (isSeparator) {
        return <M.Separator className="my-1 h-px bg-mani-border" key={idx} />;
    }

    return (
        <M.Item className={classNames(menuItemClasses, isSelected && "bg-accent")} onSelect={() => onSetIndex(idx)} key={idx}>
            {isSelected && (
                <SymbolDot className="absolute left-1.5 size-5 fill-foreground" />
            )}

            <span className="grow">
                {item}
            </span>
        </M.Item>
    );
}

const menuItemClasses = "\
relative mx-1 pl-7 pr-2 py-1.5 text-xs \
\
text-accent-foreground \
\
focus:text-accent-foreground \
focus:bg-accent \
\
rounded-md outline-hidden select-none cursor-default \
\
flex items-center";
