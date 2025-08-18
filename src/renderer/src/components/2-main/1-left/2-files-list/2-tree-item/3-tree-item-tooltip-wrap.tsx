import React, { useRef, useState, type ReactNode, type MouseEvent, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";
import { Content as TooltipAllContent, TooltipArrow } from "@radix-ui/react-tooltip";

export function TreeItemTooltip({ trigger, body }: { trigger: ReactNode; body: ReactNode; }) {
    return (
        <TooltipProvider>
            <Tooltip /** / open={true}/**/>
                <TooltipTrigger asChild>
                    <div>
                        {trigger}
                    </div>
                </TooltipTrigger>

                <TooltipPortal>
                    <TooltipContent className="p-0 max-w-72 text-xs border-border border shadow-sm">
                        {body}
                        <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
        </TooltipProvider>
    );
}

// Test of dynamic tooltip

interface ListItem {
    id: string;
    name: string;
    tooltipContent: string;
}

interface ListViewProps {
    items: ListItem[];
}

const ListViewWithDynamicTooltip: React.FC<ListViewProps> = ({ items }) => {
    const [activeItem, setActiveItem] = useState<ListItem | null>(null);
    const [isMouseOverTooltipContent, setIsMouseOverTooltipContent] = useState(false);
    const hideTooltipTimer = useRef<number | null>(null);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // State for mouse position
    const listRef = useRef<HTMLUListElement>(null); // Ref for the list container

    const clearHideTooltipTimer = () => {
        if (hideTooltipTimer.current) {
            clearTimeout(hideTooltipTimer.current);
            hideTooltipTimer.current = null;
        }
    };

    const handleMouseEnter = (item: ListItem) => (event: MouseEvent<HTMLLIElement>) => {
        console.log('handleMouseEnter');
        clearHideTooltipTimer();
        setActiveItem(item);
    };

    const handleMouseLeave = (event: MouseEvent<HTMLLIElement>) => {
        console.log('handleMouseLeave');
        // We only close the tooltip if the mouse is not over the tooltip content
        if (!isMouseOverTooltipContent) {
            hideTooltipTimer.current = window.setTimeout(() => { setActiveItem(null); }, 50);
        }
    };

    const handleTooltipContentMouseEnter = () => {
        clearHideTooltipTimer();
        setIsMouseOverTooltipContent(true);
    };

    const handleTooltipContentMouseLeave = () => {
        setIsMouseOverTooltipContent(false);
        // If the mouse leaves the tooltip content, and no item is currently hovered, close the tooltip
        if (!activeItem) {
            setActiveItem(null);
        }
    };

    const handleTooltipOpenChange = (open: boolean) => {
        if (!open && !isMouseOverTooltipContent) {
            setActiveItem(null);
        }
    };

    // (1) not working
    // Effect to track mouse position within the list container
    // useEffect(() => {
    //     const handleMouseMove = (event: globalThis.MouseEvent) => {
    //         if (listRef.current && listRef.current.contains(event.target as Node)) {
    //             console.log('handleMouseMove', { x: event.clientX, y: event.clientY });
                
    //             setMousePosition({ x: event.clientX, y: event.clientY });
    //         }
    //     };

    //     if (listRef.current) {
    //         listRef.current.addEventListener('mousemove', handleMouseMove);
    //     }

    //     return () => {
    //         if (listRef.current) {
    //             listRef.current.removeEventListener('mousemove', handleMouseMove);
    //         }
    //     };
    // }, []);

    return (
        <TooltipProvider delayDuration={1700}>
            <Tooltip open={!!activeItem} onOpenChange={handleTooltipOpenChange}>
                <TooltipPortal>
                    <TooltipAllContent
                        className="bg-sky-800 text-white p-2 rounded-md shadow-lg pointer-events-none z-120"
                        // side="top"
                        // sideOffset={10}
                        onMouseEnter={handleTooltipContentMouseEnter}
                        onMouseLeave={handleTooltipContentMouseLeave}

                        // (1) not working
                        // style={{
                        //     position: 'fixed', // Use fixed positioning
                        //     left: `${mousePosition.x + 10}px`, // Adjust left offset (e.g., 10px)
                        //     top: `${mousePosition.y - 20}px`, // Adjust top offset (e.g., 20px above)
                        //     pointerEvents: 'none', // Prevent the tooltip content from interfering with mouse events on the list items
                        // }}
                    >
                        {activeItem?.tooltipContent}
                    </TooltipAllContent>
                </TooltipPortal>

                <ul ref={listRef}> {/* Attach ref to the list container */}
                    {items.map((item) => (
                        <li
                            key={item.id}
                            onMouseEnter={handleMouseEnter(item)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <TooltipTrigger asChild>
                                <div className="bg-muted">
                                    <span>{item.name}</span>
                                </div>
                            </TooltipTrigger>
                        </li>
                    ))}
                </ul>
            </Tooltip>
        </TooltipProvider>
    );
};

export function ListViewWithDynamicTooltipTest() {
    const items: ListItem[] = [
        {
            id: '12',
            name: 'Item 12',
            tooltipContent: 'This is the tooltip content for item 1',
        },
        {
            id: '23',
            name: 'Item 23',
            tooltipContent: 'This is the tooltip content for item 2',
        },
        {
            id: '34',
            name: 'Item 34',
            tooltipContent: 'This is the tooltip content for item 3',
        },
    ];
    return <ListViewWithDynamicTooltip items={items} />;
}
