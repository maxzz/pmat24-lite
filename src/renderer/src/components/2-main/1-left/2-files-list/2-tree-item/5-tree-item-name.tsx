import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { SymbolFire } from "@/ui/icons";
import { appSettings, getTreeItemDisplayText } from "@/store";
import { type FileUs } from "@/store/store-types";
import { type TreeFileItemWState } from "../0-all/2-tree-action-atoms";

/**
 * This is used by main files tree.
 */
export function TreeItemName({ fileUs, item }: { fileUs: FileUs; item: TreeFileItemWState; }) {

    const changes = useSnapshot(fileUs.fileCnt.changesSet);
    const hasChanges = !!changes.size;
    const title = hasChanges ? "This file has changes" : undefined;

    const chooseName = useAtomValue(fileUs.parsedSrc.stats.loginFormChooseNameAtom);
    const displayText = getTreeItemDisplayText(fileUs, appSettings.files.itemsState, chooseName);

    return (<>
        {hasChanges && (
            <SymbolFire className="flex-none mr-0.5 size-3" colorize />
        )}

        <div className={classNames("truncate", hasChanges && "text-orange-500 1font-semibold")} title={title}>
            {displayText}
        </div>
    </>);
}
