import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, SyntheticEvent, forwardRef, useCallback, useMemo, useRef } from "react";
import { useSnapshot } from "valtio";
import { classNames, cn } from "@/utils";
import * as A from "@radix-ui/react-accordion";
import { ScrollArea, ScrollAreaProps } from "@ui/shadcn/scroll-area";
import { ChevronRight } from "lucide-react";
import useResizeObserver from "use-resize-observer";
import { type DataItemNavigation, type DataItemCore, type TreenIconComponent, TypeTreeFolder, TypeTreeFolderTrigger } from "./shared/types";
import { collectExpandedItemIds, findTreeItemById, getNextId } from "./shared/utils";
import { folderBaseClasses, folderSelectedClasses, folderIconClasses, leafBaseClasses, leafSelectedClasses, leafIconClasses } from "./shared/classes";

export type ItemState = {
    state: {
        selected: boolean;
        //uuid5: number; // for debugging only
    };
};

export type DataItemWState = DataItemNavigation<DataItemCore & ItemState>;

type TreeIconOptions = {
    arrowFirst?: boolean;
    hideFolderIcon?: boolean;
};

export type TreeState = {
    selectedId: string | number | undefined;
};

type TreeProps<T extends DataItemWState = DataItemWState> = Prettify<
    & {
        data: T[] | T;
        treeState: TreeState;

        onSelectChange?: (item: DataItemWState | undefined) => void;
        initialSelectedItemId?: string;
        expandAll?: boolean;

        IconTextRender?: TreeIconAndTextType;

        IconForFolder?: TreenIconComponent;
        IconForItem?: TreenIconComponent;

        selectAsTrigger?: boolean;  // click on selected item will deselect it; and no deselecting on click on empty space.
        selectEmptySpace?: boolean; // click on empty space will deselect current item

        scrollAreaProps?: ScrollAreaProps;
    }
    & TreeIconOptions
>;

/**
 * Children can be styled when parent is active:
 * [outline-width:calc(var(--parent-active)_*_1px)]
 */
const treeActiveClasses = "[--parent-active:0] focus-within:[--parent-active:1]";

export const Tree = forwardRef<HTMLDivElement, TreeProps & HTMLAttributes<HTMLDivElement>>(
    (props, ref) => {
        const {
            data, treeState, initialSelectedItemId, onSelectChange, expandAll, IconTextRender, IconForFolder, IconForItem,
            arrowFirst, hideFolderIcon, selectAsTrigger, selectEmptySpace, scrollAreaProps, className, ...rest } = props;

        const iconTextRender = IconTextRender || TreeIconAndText;

        const expandedItemIds = useMemo(
            () => {
                const rv = collectExpandedItemIds(data, initialSelectedItemId, expandAll);

                const selectedNow = findTreeItemById(data, treeState.selectedId);
                selectedNow && (selectedNow.state.selected = false);

                const last = findTreeItemById(data, rv[rv.length - 1]);
                if (last) {
                    last.state.selected = true;
                    treeState.selectedId = last.id;
                }
                return rv;
            }, [data, initialSelectedItemId, expandAll]
        );

        const handleSelectChange = useCallback(
            (event: SyntheticEvent<any>, item: DataItemWState | undefined) => {
                if (event.type !== 'contextmenu') {
                    event.stopPropagation();
                }
                doTreeItemSelect(item, { data, treeState, onSelectChange, selectAsTrigger, selectEmptySpace });
            }, [data, treeState, onSelectChange, selectAsTrigger, selectEmptySpace]
        );

        const refRoot = useRef<HTMLDivElement | null>(null);
        const { ref: refRootCb, width, height } = useResizeObserver();

        return (
            <div
                ref={(elm) => { refRootCb(elm); refRoot.current = elm; }}
                className={classNames(treeActiveClasses, className)}
                tabIndex={0}
                onKeyDown={(e) => {
                    const nextId = getNextId(refRoot.current!, e, treeState.selectedId);
                    nextId && handleSelectChange(e, findTreeItemById(data, nextId));
                }}
            >
                <ScrollArea style={{ width, height }} onClick={(e) => handleSelectChange(e, undefined)} {...scrollAreaProps}>
                    <div className="relative z-0 p-px"> {/* p-px is for space of the outer outline */}
                        <TreeItem
                            ref={ref}
                            data={data}
                            handleSelectChange={handleSelectChange}
                            expandedItemIds={expandedItemIds}
                            IconTextRender={iconTextRender}
                            IconForFolder={IconForFolder}
                            IconForItem={IconForItem}
                            arrowFirst={arrowFirst}
                            hideFolderIcon={hideFolderIcon}
                            {...rest}
                        />
                    </div>
                </ScrollArea>
            </div>
        );
    }
);
Tree.displayName = 'Tree.Root';

export function doTreeItemSelect(item: DataItemWState | undefined, { data, treeState, onSelectChange, selectAsTrigger, selectEmptySpace }: {
    data: DataItemWState[] | DataItemWState;
    treeState: TreeState;
    onSelectChange?: (item: DataItemWState | undefined) => void;
    selectAsTrigger: boolean | undefined;
    selectEmptySpace: boolean | undefined;
}) {
    if (item) {
        const clickedNewItem = treeState.selectedId !== item.id;

        if (selectAsTrigger) {
            clickedNewItem && clearPrevSelectedState();
            item.state.selected = clickedNewItem;
            treeState.selectedId = clickedNewItem ? item.id : undefined;
        } else {
            if (!clickedNewItem) {
                return;
            }
            clearPrevSelectedState();
            item.state.selected = !item.state.selected; //console.log(`🗿--- set selected = ${item.state.selected}, ${JSON.stringify({ state: item.state, id: item.id, name: item.name })}`);
            treeState.selectedId = item.id;
        }
    } else {
        if (!selectEmptySpace) {
            return;
        }
        clearPrevSelectedState();
        treeState.selectedId = undefined;
    }

    function clearPrevSelectedState() {
        if (treeState.selectedId) {
            const prevItem = findTreeItemById(data, treeState.selectedId);
            prevItem && (prevItem.state.selected = false);
        }
    }

    onSelectChange?.(item);
}

type HandleSelectChange = (event: SyntheticEvent<any>, item: DataItemWState | undefined) => void;

type TreeItemProps = Prettify<
    & Pick<TreeProps, 'data' | 'IconForFolder' | 'IconForItem'>
    & { IconTextRender: TreeIconAndTextType; }
    & {
        handleSelectChange: HandleSelectChange;
        expandedItemIds: string[];
    }
    & TreeIconOptions
>;

const TreeItem = forwardRef<HTMLDivElement, TreeItemProps & HTMLAttributes<HTMLDivElement>>(
    ({ className, data, handleSelectChange, expandedItemIds, IconTextRender, IconForFolder, IconForItem, arrowFirst, hideFolderIcon, ...rest }, ref) => {
        return (
            <div ref={ref} role="tree" className={className} {...rest}>
                <ul>
                    {data instanceof Array
                        ? (data.map((item) => (
                            <li key={item.id}>
                                {item.children
                                    ? (
                                        <A.Root type="multiple" defaultValue={expandedItemIds}>
                                            <A.Item value={`${item.id}`} data-tree-id={item.id} data-tree-folder={TypeTreeFolder}>
                                                <Folder
                                                    item={item}
                                                    IconTextRender={IconTextRender}
                                                    Icon={IconForFolder}
                                                    arrowFirst={arrowFirst}
                                                    hideFolderIcon={hideFolderIcon}
                                                    onClick={(e) => handleSelectChange(e, item)}
                                                />

                                                <FolderContent className="pl-6">
                                                    <TreeItem
                                                        data={item.children}
                                                        handleSelectChange={handleSelectChange}
                                                        expandedItemIds={expandedItemIds}
                                                        IconTextRender={IconTextRender}
                                                        IconForFolder={IconForFolder}
                                                        IconForItem={IconForItem}
                                                        arrowFirst={arrowFirst}
                                                        hideFolderIcon={hideFolderIcon}
                                                    />
                                                </FolderContent>
                                            </A.Item>
                                        </A.Root>
                                    ) : (
                                        <Leaf
                                            item={item}
                                            IconTextRender={IconTextRender}
                                            onClick={(e) => handleSelectChange(e, item)}
                                            onContextMenu={(e) => handleSelectChange(e, item)}
                                            Icon={IconForItem}
                                        />
                                    )}
                            </li>
                        )))
                        : (
                            <li>
                                <Leaf
                                    item={data}
                                    IconTextRender={IconTextRender}
                                    onClick={(e) => handleSelectChange(e, data)}
                                    Icon={IconForItem}
                                />
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
);
TreeItem.displayName = 'Tree.TreeItem';

type LeafFolderProps = {
    item: DataItemWState;
    Icon?: TreenIconComponent;
    IconTextRender: TreeIconAndTextType;
};

const Leaf = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & LeafFolderProps>(
    ({ className, item, IconTextRender, Icon, ...rest }, ref) => {
        const { selected } = useSnapshot(item.state); //console.log(`🗿  leaf-render selected = ${selected}, ${JSON.stringify({ state: item.state, id: item.id, name: item.name })}`);
        return (
            <div
                ref={ref}
                className={cn(leafBaseClasses, selected && leafSelectedClasses, className)}
                data-tree-id={item.id}
                {...(selected && { 'data-tree-item-selected': '' })}
                {...rest}
            >
                <IconTextRender item={item} Icon={Icon} hideFolderIcon={false} iconClasses={leafIconClasses} />
            </div>
        );
    }
);
Leaf.displayName = 'Tree.Leaf';

const Folder = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement> & LeafFolderProps & TreeIconOptions>(
    ({ className, item, IconTextRender, Icon, arrowFirst = true, hideFolderIcon, ...rest }, ref) => {
        const { selected } = useSnapshot(item.state);
        return (
            <FolderTrigger
                className={cn(folderBaseClasses, selected && folderSelectedClasses, className)}
                data-tree-folder-trigger={TypeTreeFolderTrigger}
                {...(selected && { 'data-tree-item-selected': '' })}
                arrowFirst={arrowFirst}
                ref={ref}
                {...rest}
            >
                <IconTextRender item={item} Icon={Icon} hideFolderIcon={hideFolderIcon} iconClasses={folderIconClasses} />
            </FolderTrigger>
        );
    }
);
Folder.displayName = 'Tree.Folder';

const FolderTrigger = forwardRef<ElementRef<typeof A.Trigger>, ComponentPropsWithoutRef<typeof A.Trigger> & Pick<TreeIconOptions, 'arrowFirst'>>(
    ({ className, children, arrowFirst, ...rest }, ref) => {
        const ArrowIcon = <ChevronRight className={classNames("shrink-0 ml-auto h-4 w-4 text-accent-foreground/50 transition-transform duration-200", arrowFirst && "mr-2")} />;
        return (
            <A.Header>
                <A.Trigger
                    asChild
                    className={cn("flex-1 w-full transition-all outline-none cursor-pointer flex items-center", arrowFirst ? "first:[&[data-state=open]>svg]:rotate-90" : "last:[&[data-state=open]>svg]:rotate-90", className)}
                    ref={ref}
                    {...rest}
                >
                    <div>
                        {arrowFirst && <>{ArrowIcon}</>}
                        {children}
                        {!arrowFirst && <>{ArrowIcon}</>}
                    </div>
                </A.Trigger>
            </A.Header>
        );
    }
);
FolderTrigger.displayName = 'Tree.Folder.Trigger';

const FolderContent = forwardRef<ElementRef<typeof A.Content>, ComponentPropsWithoutRef<typeof A.Content>>(
    ({ className, children, ...rest }, ref) => (
        <A.Content
            ref={ref}
            className={cn("data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down transition-all overflow-hidden", className)}
            {...rest}
        >
            <div>
                {children}
            </div>
        </A.Content>
    )
);
FolderContent.displayName = 'Tree.Folder.Content';

export type TreeIconAndTextProps = Prettify<
    & {
        item: DataItemNavigation<DataItemCore>;
        Icon?: TreenIconComponent;
        iconClasses: string;
    }
    & Pick<TreeIconOptions, 'hideFolderIcon'>
>;

export type TreeIconAndTextType = typeof TreeIconAndText;

export function TreeIconAndText({ item, Icon, iconClasses, hideFolderIcon }: TreeIconAndTextProps) {
    const IconToRender = item.icon || (!hideFolderIcon && Icon);
    return (<>
        {IconToRender && <IconToRender className={iconClasses} aria-hidden="true" />}

        <span className="flex-grow truncate">
            {item.name}
        </span>
    </>);
}
