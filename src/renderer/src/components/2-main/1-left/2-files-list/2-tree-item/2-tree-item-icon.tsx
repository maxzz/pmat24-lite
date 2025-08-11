import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { type FileUs } from "@/store/store-types";
import { type TreenIconComponent } from "@ui/shadcn/tree";
import { FormIdx, isAnyWhy } from "@/store/manifest";
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
    // const hasCpass = useAtomValue(fileUs.maniAtomsAtom)?.[FormIdx.cpass]; // This is good and we need option for that, but we cannot show it before maniAtoms created

    const IconBody = (<>
        {IconToRender && (
            <div className="relative">
                <IconToRender className={iconClasses} aria-hidden="true" />

                {/* {hasCpass && (
                    <div className="absolute right-1 top-0 size-1 bg-foreground/30 dark:bg-foreground/50 rounded" title="with password change"></div>
                )} */}

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
