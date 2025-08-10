import { type PmatFolder } from "@/store/1-atoms/1-files";
import { findShortestPathInFnames } from "@/store/store-utils/1-file-system-utils";

export function getRootFromFpath({ files, fromMain }: { files: { fpath: string; }[]; fromMain: boolean; }): PmatFolder {
    const rootPath = findShortestPathInFnames(files.map((f) => f.fpath));
    return {
        fpath: rootPath,
        handle: undefined,
        fromMain,
    };
}
