import React, { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";
import { TooltipArrow } from "@radix-ui/react-tooltip";

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
                    <TooltipContent className="p-0 max-w-72 text-xs border-border border shadow">
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

    return (
        <TooltipProvider delayDuration={1700}>
            <Tooltip open={!!activeItem} onOpenChange={handleTooltipOpenChange}>
                <TooltipPortal>
                    <TooltipContent
                        className="bg-sky-800 text-white p-2 rounded-md shadow-lg pointer-events-none"
                        side="top"
                        sideOffset={10}
                        onMouseEnter={handleTooltipContentMouseEnter}
                        onMouseLeave={handleTooltipContentMouseLeave}
                    >
                        {activeItem?.tooltipContent}
                    </TooltipContent>
                </TooltipPortal>

                <ul>
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
