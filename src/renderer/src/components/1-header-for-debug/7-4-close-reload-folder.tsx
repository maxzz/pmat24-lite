import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui/shadcn/button";
import { IconRefresh } from "@/ui/icons/normal";
import { appSettings } from "@/store/9-ui-state";
import { doCloseRootDirAtom, rootDir } from "@/store/5-1-open-files";
import { doSetFilesFrom_MruFolder_Atom } from "@/store/0-serve-atoms/2-do-load-files";

export function TestCloseFolder() {
    const doCloseRootDir = useSetAtom(doCloseRootDirAtom);
    const hasRootDir = useSnapshot(rootDir).fpath.length;
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={doCloseRootDir} disabled={!hasRootDir}>
            Close Folder
        </Button>
    );
}

export function TestReloadLastFolder() {
    const doSetFilesFrom_MruFolder = useSetAtom(doSetFilesFrom_MruFolder_Atom);
    const { folders } = useSnapshot(appSettings.appUi.mru);
    const lastOpened = folders[0];
    const isDisabled = !lastOpened;
    return (
        <Button variant="outline" className="text-[.65rem]" title="Reload open folder" onClick={() => doSetFilesFrom_MruFolder({ folder: lastOpened })} disabled={isDisabled}>
            <IconRefresh className="size-3" />
        </Button>
    );
}
