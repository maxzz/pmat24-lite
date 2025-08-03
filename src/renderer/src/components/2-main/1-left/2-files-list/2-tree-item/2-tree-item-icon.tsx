import { useSnapshot } from "valtio";
import { type FileUs } from "@/store/store-types";
import { type TreenIconComponent } from "@ui/shadcn/tree";
import { isAnyWhy } from "@/store/manifest";
import { TreeItemTooltip } from "./3-tree-item-tooltip-wrap";
import { TooltipBody } from "./4-tree-item-tooltip-body";
import { SymbolFire } from "@/ui/icons";

type FileIconAttentionProps = {
    fileUs: FileUs;
    IconToRender: false | TreenIconComponent | undefined;
    name: string;
    iconClasses: string;
};

export function TreeItemIconWithAttention({ IconToRender, name, fileUs, iconClasses }: FileIconAttentionProps) {
    const hasChanges = !!useSnapshot(fileUs.fileCnt.changesSet).size;
    const hasBailOut = isAnyWhy(fileUs.parsedSrc.meta);
    const fileIndex = fileUs.fileCnt.idx + 1;

    const IconBody = (<>
        {IconToRender && (
            <div className="relative">
                <IconToRender className={iconClasses} aria-hidden="true" />

                {hasChanges && (
                    <SymbolFire className="absolute right-0 -top-1 size-3 text-red-500" colorize />
                )}
            </div>
        )}
    </>);

    if (!hasBailOut) {
        return IconBody;
    }

    return (
        <TreeItemTooltip
            trigger={
                IconBody
            }
            body={(
                <TooltipBody fileUs={fileUs} fileIndex={fileIndex} />
            )}
        />
    );
}
