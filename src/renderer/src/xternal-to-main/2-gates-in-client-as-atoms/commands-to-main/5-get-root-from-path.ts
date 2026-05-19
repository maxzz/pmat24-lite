import { type PmatFolder } from "@/store/5-1-open-files";
import { findShortestPathInFnames } from "@/store/store-utils/1-file-system-utils";
import { filenameWithoutPath, pathWithoutFilename } from "@/utils";

export function getRootFromFpath({ files, fromMain }: { files: { fpath: string; }[]; fromMain: boolean; }): PmatFolder {
    let rootPath = findShortestPathInFnames(files.map((f) => f.fpath));

    // In folder-open flows we may only receive files from subfolders `a|b|c` (no root-level files),
    // which makes "shortest fpath" equal to `${root}/c` (or `${root}/a`). Treat that as noise and
    // lift root back to the selected folder.
    if (fromMain && rootPath) {
        const base = filenameWithoutPath(rootPath).toLowerCase();
        if (base === 'a' || base === 'b' || base === 'c') {
            rootPath = pathWithoutFilename(rootPath);
        }
    }
    return {
        fpath: rootPath,
        handle: undefined,
        fromMain,
    };
}
