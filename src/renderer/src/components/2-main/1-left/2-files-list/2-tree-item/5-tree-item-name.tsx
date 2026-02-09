import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { IconMicroscope } from "@/ui/icons";
import { modeTextInTest } from "@/components/2-main/2-right/2-file-mani/2-form-options";
import { appSettings } from "@/store/9-ui-state";
import { getTreeItemDisplayText } from "@/store/store-utils";
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
        <div className={classNames("mr-4 truncate", hasChanges && "text-orange-600")} title={title}>
            {displayText}
        </div>

        <TestInUseIcons fileUs={fileUs} />
    </>);
}

function TestInUseIcons({ fileUs }: { fileUs: FileUs; }) {
    const isTest = useAtomValue(fileUs.maniInTestAtom);
    // const isInUse = useAtomValue(fileUs.maniInUseAtom);

    return (<>
        {/* {isTest && (
            <IconMicroscope className="absolute right-1 size-3 text-muted-foreground" title={modeTextInTest} />
        )} */}

        <IconMicroscope className={classNames("absolute right-1 size-3", isTest ? "text-muted-foreground" : "text-foreground/10")} title={modeTextInTest} />

        {/* {!isInUse && (
            <IconNotInUse className="absolute right-1 size-3 text-muted-foreground" title={modeTextNotInUse} />
        )} */}
    </>);
}
