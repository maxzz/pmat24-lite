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

                <div className="px-2 py-1 bg-foreground/5 border border-border rounded-md flex flex-col items-start">
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
    const short = filenameWithoutPath(folder.fpath);
    const doSetFilesFrom_MruFolder = useSetAtom(doSetFilesFrom_MruFolder_Atom);
    return (
        <div className="flex items-center gap-1">
            <Button variant="ghost" className="w-full text-xs" onClick={() => doSetFilesFrom_MruFolder({ folder })} title={folder.fpath}>
                {short}
            </Button>
        </div>
    );
}

//TODO: close folder button is broken
