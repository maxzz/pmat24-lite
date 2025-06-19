import { type ReactNode } from "react";
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

import React, { useState, MouseEvent } from 'react';

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

    const handleMouseEnter = (item: ListItem) => (event: MouseEvent<HTMLLIElement>) => {
        console.log('handleMouseEnter');
        setActiveItem(item);
    };

    const handleMouseLeave = (event: MouseEvent<HTMLLIElement>) => {
        console.log('handleMouseLeave');
        setActiveItem(null);
    };

    return (
        <TooltipProvider delayDuration={1700} disableHoverableContent>
            <Tooltip open={!!activeItem}>
                <TooltipPortal>
                    <TooltipContent>{activeItem?.tooltipContent}</TooltipContent>
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
            id: '1',
            name: 'Item 12',
            tooltipContent: 'This is the tooltip content for item 1',
        },
        {
            id: '2',
            name: 'Item 2',
            tooltipContent: 'This is the tooltip content for item 2',
        },
        {
            id: '3',
            name: 'Item 3',
            tooltipContent: 'This is the tooltip content for item 3',
        },
    ];
    return <ListViewWithDynamicTooltip items={items} />;
}
