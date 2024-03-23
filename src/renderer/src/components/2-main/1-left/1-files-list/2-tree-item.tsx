import { TreeIconAndTextProps } from "@ui/shadcn/tree";

export function TreeIconAndText({ item, Icon, iconClasses, hideFolderIcon }: TreeIconAndTextProps) {
    const IconToRender = item.icon || (!hideFolderIcon && Icon);
    return (<>
        {IconToRender && <IconToRender className={iconClasses} aria-hidden="true" />}

        <span className="flex-grow truncate">
            {item.name}
        </span>
    </>);
}
