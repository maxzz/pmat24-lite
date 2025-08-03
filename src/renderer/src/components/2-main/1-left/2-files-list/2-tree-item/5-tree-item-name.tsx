import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { IconMicroscope, IconNotInUse, SymbolFire } from "@/ui/icons";
import { appSettings, getTreeItemDisplayText } from "@/store";
import { type FileUs } from "@/store/store-types";
import { type TreeFileItemWState } from "../0-all/2-tree-action-atoms";

/**
 * This is used by main files tree.
 */
export function TreeItemName({ fileUs, item }: { fileUs: FileUs; item: TreeFileItemWState; }) {

    const hasChanges = !!useSnapshot(fileUs.fileCnt.changesSet).size;
    const title = hasChanges ? "This file has changes" : undefined;

    const chooseName = useAtomValue(fileUs.parsedSrc.stats.loginFormChooseNameAtom);
    const displayText = getTreeItemDisplayText(fileUs, appSettings.files.itemsState, chooseName);

    return (<>
        <div className="relative">
            {hasChanges && (
                <SymbolFire className="absolute -left-4 -top-1/3 flex-none mr-0.5 size-3 text-red-500" colorize />
            )}

            <div className={classNames("truncate", hasChanges && "text-orange-600")} title={title}>
                {displayText}
            </div>
        </div>

        <StateIcons fileUs={fileUs} />
    </>);
}

function StateIcons({ fileUs }: { fileUs: FileUs; }) {
    const isInUse = useAtomValue(fileUs.maniInUseAtom);
    const isTest = useAtomValue(fileUs.maniInTestAtom);

    return (<>
        {isInUse && (
            <IconMicroscope className="absolute size-3 right-5 text-muted-foreground" title="This file is in test mode" />
        )}

        {isTest && (
            <IconNotInUse className="absolute size-3 right-1 text-muted-foreground" title="This file is not in use for production" />
        )}
    </>);
}
