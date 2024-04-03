import { PrimitiveAtom } from 'jotai';
import * as menu from '@radix-ui/react-dropdown-menu';
import { classNames } from '@/utils';
import { SymbolChevronDown, SymbolDot } from '@ui/icons';

const menuContentClasses = "\
px-1.5 py-1 max-h-[50vh] \
\
bg-primary-100 \
dark:bg-gray-800 \
\
rounded-lg shadow-md \
overflow-auto smallscroll smallscroll-light \
\
radix-side-top:animate-slide-up \
radix-side-bottom:animate-slide-down \
\
grid grid-cols-1";
//TODO: maybe have a separate popop for big list and add search; or simplescroll; more fields.. put on top?; scroll to view;

const menuItemClasses = "\
relative pl-8 pr-4 py-2 text-xs \
text-primary-700 \
data-highlighted:bg-primary-700 \
data-highlighted:text-primary-100 \
rounded-md outline-none select-none cursor-default \
flex items-center";

export function Dropdown(useItAtom: PrimitiveAtom<boolean>, items: string[], selectedIndex: number, onSetIndex: (idx: number) => void) {
    return (
        <menu.Root>
            <menu.Trigger asChild>
                <button className="px-2 border-l border-primary-800 outline-none group">
                    <SymbolChevronDown className="size-4 border-primary-500 rounded group-focus-within:border" />
                </button>
            </menu.Trigger>

            <menu.Portal container={document.getElementById('portal')}>
                <menu.Content className={menuContentClasses}>

                    {items.map(
                        (item, idx) => {
                            const isSelected = selectedIndex === idx;
                            const isSeparator = item === '-';
                            if (isSeparator) {
                                return <menu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" key={idx} />;
                            }
                            return (
                                <menu.Item
                                    className={classNames(menuItemClasses, isSelected && "bg-primary-300")}
                                    onSelect={() => onSetIndex(idx)}
                                    key={idx}
                                >
                                    {isSelected && (
                                        <SymbolDot className="absolute left-2 size-5 fill-primary-700" />
                                    )}

                                    <span className="flex-grow">
                                        {item}
                                    </span>
                                </menu.Item>
                            );
                        })
                    }

                </menu.Content>
            </menu.Portal>
        </menu.Root>
    );
}

export function isKeyToClearDefault(key: string) {
    return key === 'Backspace' || /^[a-z0-9]$/i.test(key);
}
