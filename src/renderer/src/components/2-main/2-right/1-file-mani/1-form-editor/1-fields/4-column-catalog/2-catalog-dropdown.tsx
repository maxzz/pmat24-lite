import * as menu from '@radix-ui/react-dropdown-menu';
import { SymbolChevronDown, SymbolDot } from '@ui/icons';
import { classNames } from '@/utils';

type CatalogDropdownProps = {
    items: string[];
    selectedIndex: number;
    onSetIndex: (idx: number) => void;
};

const menuContentClasses = "\
px-1 py-1 max-h-[50vh] \
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
relative pl-8 pr-4 py-2 text-xs \
\
text-accent-foreground \
\
focus:text-accent-foreground \
focus:bg-accent \
\
rounded-md outline-none select-none cursor-default \
\
flex items-center";

export function isKeyToClearDefault(key: string) {
    return key === 'Backspace' || /^[a-z0-9]$/i.test(key);
}

export function CatalogDropdown({ items, selectedIndex, onSetIndex }: CatalogDropdownProps) {
    return (
        <menu.Root>
            <menu.Trigger asChild>
                <button className="px-2 border-l border-mani-background outline-none group">
                    <SymbolChevronDown className="size-4 border-primary-500 rounded group-focus-within:border" />
                </button>
            </menu.Trigger>

            <menu.Portal container={document.getElementById('portal')}>
                <menu.Content className={menuContentClasses} sideOffset={4} align="end">
                    {items.map((item, idx) => (
                        <CatalogItem item={item} idx={idx} selectedIndex={selectedIndex} onSetIndex={onSetIndex} key={idx} />
                    ))}
                </menu.Content>
            </menu.Portal>
        </menu.Root>
    );
}

function CatalogItem({ item, idx, selectedIndex, onSetIndex }: { item: string; idx: number; selectedIndex: number; onSetIndex: (idx: number) => void; }): JSX.Element {
    const isSelected = idx === selectedIndex;
    const rv = item === '-'
        ? (
            <menu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" key={idx} />
        )
        : (
            <menu.Item className={classNames(menuItemClasses, isSelected && "bg-primary-300")} onSelect={() => onSetIndex(idx)} key={idx}>
                {isSelected && (
                    <SymbolDot className={`absolute left-2 size-5 ${isSelected ? 'hover:fill-primary-200' : 'fill-primary-700'}`} />
                )}
                <span className="ml-2 flex-grow self-start">{item}</span>
            </menu.Item>
        );
    return rv;
}
