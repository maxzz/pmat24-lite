import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { filenameWithoutPath } from "@/utils";
import { Button } from "@/ui";
import { type PmatFolder, appSettings, doSetFilesFrom_MruFolder_Atom } from "@/store";

export function RecentFilesList() {
    const { folders } = useSnapshot(appSettings.appUi.mru);
    const hasRecent = true;
    return (<>
        {hasRecent && (
            <div className="text-xs space-y-1">
                <div className="font-semibold">
                    Recent
                </div>

                {folders.map(
                    (folder, idx) => (
                        <FolderItem folder={folder} key={idx} />
                    )
                )}

                <div className="">
                    Folder 1 (placeholder)
                </div>
                <div className="">
                    Folder 2 (placeholder)
                </div>
            </div>
        )}
    </>);
}

function FolderItem({ folder }: { folder: PmatFolder; }) {
    const short = filenameWithoutPath(folder.fpath);
    const doSetFilesFrom_MruFolder = useSetAtom(doSetFilesFrom_MruFolder_Atom);
    return (
        <div className="flex items-center gap-1">
            <Button variant="ghost" className="text-xs" onClick={() => doSetFilesFrom_MruFolder({ folder })}>
                {short}
            </Button>
        </div>
    );
}
