import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { motion } from "motion/react";
import { filenameWithoutPath } from "@/utils";
import { Button } from "@/ui";
import { type PmatFolder, appSettings, doSetFilesFrom_MruFolder_Atom } from "@/store";

export function RecentFilesList({ className, ...rest }: ComponentPropsWithoutRef<typeof motion.div>) {
    const { folders } = useSnapshot(appSettings.appUi.mru);
    const hasRecent = !!folders.length;
    return (<>
        {hasRecent && (
            <motion.div
                className="text-xs space-y-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                {...rest}
            >
                <div>
                    Recent
                </div>

                <div className="p-1 min-w-56 bg-white/70 dark:bg-black/20 1bg-foreground/5 border border-foreground/10 rounded-md flex flex-col items-start">
                    {folders.map(
                        (folder, idx) => (
                            <FolderItem folder={folder} key={idx} />
                        )
                    )}
                </div>
            </motion.div>
        )}
    </>);
}

function FolderItem({ folder }: { folder: PmatFolder; }) {
    const short = filenameWithoutPath(folder.fpath);
    const doSetFilesFrom_MruFolder = useSetAtom(doSetFilesFrom_MruFolder_Atom);
    return (
        <Button variant="ghost" className="justify-start w-full h-6 text-xs" title={folder.fpath} onClick={() => doSetFilesFrom_MruFolder({ folder })}>
            {short}
        </Button>
    );
}
