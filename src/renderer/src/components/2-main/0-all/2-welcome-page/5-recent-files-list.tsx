import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { filenameWithoutPath } from "@/utils";
import { Button } from "@/ui";
import { type PmatFolder, appSettings, doSetFilesFrom_MruFolder_Atom } from "@/store";

export function RecentFilesList() {
    const { folders } = useSnapshot(appSettings.appUi.mru);
    const hasRecent = !!folders.length;

    console.log('%cRecentFilesList', 'color: magenta', folders);
    return (<>
        {hasRecent && (
            <div className="text-xs space-y-1">
                <div className="font-semibold">
                    Recent
                </div>

                <div className="p-1 min-w-56 bg-foreground/5 border border-foreground/10 rounded-md flex flex-col items-start">
                    {folders.map(
                        (folder, idx) => (
                            <FolderItem folder={folder} key={idx} />
                        )
                    )}
                </div>
            </div>
        )}
    </>);
}

function FolderItem({ folder }: { folder: PmatFolder; }) {
    console.log('FolderItem', folder);

    const short = filenameWithoutPath(folder.fpath);
    const doSetFilesFrom_MruFolder = useSetAtom(doSetFilesFrom_MruFolder_Atom);
    return (
        <Button variant="ghost" className="justify-start w-full h-6 text-xs" title={folder.fpath} onClick={() => doSetFilesFrom_MruFolder({ folder })}>
            {short}
        </Button>
    );
}
