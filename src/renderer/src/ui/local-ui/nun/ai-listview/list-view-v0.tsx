import { useCallback, useRef, KeyboardEvent, Fragment, RefObject } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
// import * as Separator from "@radix-ui/react-separator";
import { FocusScope } from "@radix-ui/react-focus-scope";

type ListItem = {
    id: string;
    content: string;
};

type ListViewProps = {
    items?: ListItem[];
};

const scrollIntoView = (viewportRef: RefObject<HTMLDivElement | null>, el: HTMLElement) => {
    if (viewportRef.current) {
        const viewportRect = viewportRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        if (elRect.bottom > viewportRect.bottom) {
            el.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        else if (elRect.top < viewportRect.top) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

export function ListViewV0({ items = [] }: ListViewProps) {
    const listRef = useRef<HTMLUListElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLUListElement>) => {
            const currentElement = document.activeElement as HTMLElement;
            const listItems = Array.from(listRef.current?.children || []) as HTMLElement[];
            const currentIndex = listItems.indexOf(currentElement);

            let nextElement: HTMLElement | undefined;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    if (currentIndex < listItems.length - 1) {
                        nextElement = listItems[currentIndex + 1];
                    }
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    if (currentIndex > 0) {
                        nextElement = listItems[currentIndex - 1];
                    }
                    break;
                case 'Home':
                    event.preventDefault();
                    nextElement = listItems[0];
                    break;
                case 'End':
                    event.preventDefault();
                    nextElement = listItems[listItems.length - 1];
                    break;
            }

            if (nextElement) {
                nextElement.focus();
                scrollIntoView(viewportRef, nextElement);
            }
        }, []
    );

    return (
        <FocusScope>
            <ScrollArea.Root className="w-[300px] h-[400px] rounded-md border border-gray-200 shadow-xs">
                <ScrollArea.Viewport ref={viewportRef} className="w-full h-full">
                    <ul
                        ref={listRef}
                        onKeyDown={handleKeyDown}
                        className="p-4 space-y-2"
                        role="listbox"
                    >
                        {items?.length > 0 ? (items.map(
                            (item, index) => (
                                <Fragment key={item.id}>
                                    <li
                                        tabIndex={0}
                                        role="option"
                                        aria-selected="false"
                                        className="p-2 rounded-md hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                    >
                                        {item.content}
                                    </li>
                                    {/* {index < items.length - 1 && ( <Separator.Root className="h-px bg-gray-200" /> )} */}
                                </Fragment>
                            )
                        )) : (
                            <li className="p-2 text-gray-500">No items to display</li>
                        )}
                    </ul>
                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar
                    className="flex select-none touch-none p-0.5 bg-gray-100 transition-colors duration-150 ease-out hover:bg-gray-200 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                    orientation="vertical"
                >
                    <ScrollArea.Thumb className="flex-1 bg-gray-300 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>

            </ScrollArea.Root>
        </FocusScope>
    );
}
