import { type PmatFolder, findShortestPathInFnames } from "@/store";

export function getRootFromFpath({ files, fromMain }: { files: { fpath: string; }[]; fromMain: boolean; }): PmatFolder {
    const rootPath = findShortestPathInFnames(files.map((f) => f.fpath));
    return {
        fpath: rootPath,
        handle: undefined,
        fromMain,
    };
}
