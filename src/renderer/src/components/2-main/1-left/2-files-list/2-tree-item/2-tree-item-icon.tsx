import { FileUs } from "@/store/store-types";
import { isAnyWhy } from "@/store/manifest";
import { TreenIconType } from "@ui/shadcn/tree";
import { TreeItemTooltip } from "./4-tooltip-all";
import { TooltipBody } from "./5-tooltip-body";

type FileIconAttentionProps = {
    fileUs: FileUs;
    IconToRender: false | TreenIconType | undefined;
    name: string;
    iconClasses: string;
};

export function TreeItemIconWithAttention({ IconToRender, name, fileUs, iconClasses }: FileIconAttentionProps) {
    const hasBailOut = isAnyWhy(fileUs.parsedSrc.meta);
    const fileIndex = fileUs.idx + 1;

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
