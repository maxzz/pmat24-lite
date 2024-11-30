import { type PrimitiveAtom } from 'jotai';
import * as M from '@radix-ui/react-dropdown-menu';
import { SymbolChevronDown, SymbolDot } from '@ui/icons';
import { classNames } from '@/utils';

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
relative mx-1 pl-7 pr-2 py-1.5 text-xs \
\
text-accent-foreground \
\
focus:text-accent-foreground \
focus:bg-accent \
\
rounded-md outline-none select-none cursor-default \
\
flex items-center";

type ValueDropdownProps = {
    useItAtom: PrimitiveAtom<boolean>;
    items: string[];
    selectedIndex: number;
    onSetIndex: (idx: number) => void;
};

export function ValueDropdown({ useItAtom, items, selectedIndex, onSetIndex }: ValueDropdownProps) {
    return (
        <M.Root>
            <M.Trigger asChild>
                <button className="px-1.5 border-mani-border-separator border-l outline-none group/btn">
                    <SymbolChevronDown className="size-4 border-muted-foreground rounded group-focus-within/btn:border" />
                </button>
            </M.Trigger>

            <M.Portal container={document.getElementById('portal')}>
                <M.Content className={menuContentClasses} sideOffset={4} align="end" >
                    {items.map(
                        (item, idx) => {
                            const isSeparator = item === '-';
                            if (isSeparator) {
                                return <M.Separator className="my-1 h-px bg-mani-border" key={idx} />;
                            } else {
                                return <MenuItemValue item={item} idx={idx} selectedIndex={selectedIndex} onSetIndex={onSetIndex} key={idx} />;
                            }
                        })
                    }
                </M.Content>
            </M.Portal>
        </M.Root>
    );
}

type MenuItemValueProps = {
    item: string;
    idx: number;
    selectedIndex: number;
    onSetIndex: (idx: number) => void;
};

function MenuItemValue({ item, idx, selectedIndex, onSetIndex }: MenuItemValueProps): JSX.Element {
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

            <span className="flex-grow">
                {item}
            </span>
        </M.Item>
    );
}
