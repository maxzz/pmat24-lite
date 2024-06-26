import { PrimitiveAtom } from 'jotai';
import * as menu from '@radix-ui/react-dropdown-menu';
import { classNames } from '@/utils';
import { SymbolChevronDown, SymbolDot } from '@ui/icons';

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
        <menu.Root>
            <menu.Trigger asChild>
                <button className="px-1.5 border-mani-border-separator border-l outline-none group/btn">
                    <SymbolChevronDown className="size-4 border-muted-foreground rounded group-focus-within/btn:border" />
                </button>
            </menu.Trigger>

            <menu.Portal container={document.getElementById('portal')}>
                <menu.Content className={menuContentClasses} sideOffset={4} align="end" >

                    {items.map(
                        (item, idx) => {
                            const isSeparator = item === '-';
                            if (isSeparator) {
                                return <menu.Separator className="my-1 h-px bg-mani-border" key={idx} />;
                            }
                            return (
                                <ValueItemMenu item={item} idx={idx} selectedIndex={selectedIndex} onSetIndex={onSetIndex} key={idx} />
                            );
                        })
                    }

                </menu.Content>
            </menu.Portal>
        </menu.Root>
    );
}

type ValueItemMenuProps = {
    item: string;
    idx: number;
    selectedIndex: number;
    onSetIndex: (idx: number) => void;
};

function ValueItemMenu({ item, idx, selectedIndex, onSetIndex }: ValueItemMenuProps): JSX.Element {
    const isSelected = selectedIndex === idx;
    const isSeparator = item === '-';
    if (isSeparator) {
        return <menu.Separator className="my-1 h-px bg-mani-border" key={idx} />;
    }
    return (
        <menu.Item className={classNames(menuItemClasses, isSelected && "bg-accent")} onSelect={() => onSetIndex(idx)} key={idx}>
            {isSelected && (
                <SymbolDot className="absolute left-1.5 size-5 fill-foreground" />
            )}

            <span className="flex-grow">
                {item}
            </span>
        </menu.Item>
    );
}
