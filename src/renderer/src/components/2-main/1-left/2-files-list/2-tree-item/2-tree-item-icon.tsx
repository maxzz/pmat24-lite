import { FileUs } from "@/store/store-types";
import { isAnyWhy } from "@/store/manifest";
import { TreenIconComponent } from "@ui/shadcn/tree";
import { TreeItemTooltip } from "./3-tree-item-tooltip-wrap";
import { TooltipBody } from "./4-tree-item-tooltip-body";

type FileIconAttentionProps = {
    fileUs: FileUs;
    IconToRender: false | TreenIconComponent | undefined;
    name: string;
    iconClasses: string;
};

export function TreeItemIconWithAttention({ IconToRender, name, fileUs, iconClasses }: FileIconAttentionProps) {
    const hasBailOut = isAnyWhy(fileUs.parsedSrc.meta);
    const fileIndex = fileUs.fileCnt.idx + 1;

    const Body = (<>
        {IconToRender && (
            <IconToRender className={iconClasses} aria-hidden="true" />
        )}
    </>);

    if (!hasBailOut) {
        return Body;
    }

    return (
        <TreeItemTooltip
            trigger={Body}
            body={<TooltipBody fileUs={fileUs} fileIndex={fileIndex} />}
        />
    );
}
