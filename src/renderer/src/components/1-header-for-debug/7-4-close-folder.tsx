import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { doCloseRootDirAtom, rootDir } from "@/store/5-1-open-files";

export function TestCloseFolder() {
    const doClearFileContent = useSetAtom(doCloseRootDirAtom);
    const hasRootDir = useSnapshot(rootDir).fpath.length;
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={doClearFileContent} disabled={!hasRootDir}>
            Close Folder
        </Button>
    );
}
