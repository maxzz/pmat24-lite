import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { IconMicroscope, IconNotInUse } from "@/ui/icons";
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
        <div className={classNames("truncate", hasChanges && "text-orange-600")} title={title}>
            {displayText}
        </div>

        <StateIcons fileUs={fileUs} />
    </>);
}

function StateIcons({ fileUs }: { fileUs: FileUs; }) {
    const isInUse = useAtomValue(fileUs.maniInUseAtom);
    const isTest = useAtomValue(fileUs.maniInTestAtom);

    return (<>
        {isTest && (
            <IconMicroscope className="absolute size-3 right-5 text-muted-foreground" title="This file is in test mode" />
        )}

        {!isInUse && (
            <IconNotInUse className="absolute size-3 right-1 text-muted-foreground" title="This file is not in use for production" />
        )}
    </>);
}
