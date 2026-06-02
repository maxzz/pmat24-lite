import { type PmatFolder } from "@/store/5-1-open-files";
import { findShortestPathInFnames } from "@/store/store-utils/1-file-system-utils";
import { filenameWithoutPath, pathWithoutFilename } from "@/utils";

export function getRootFromFpath({ files, fromMain, rootFolder }: { files: { fpath: string; }[]; fromMain: boolean; rootFolder?: string; }): PmatFolder {
    // Prefer the explicit folder selected in the host (main process). The opened/dropped folder is
    // ALWAYS the root, regardless of its name (even if it is literally named "a"/"b"/"c", or a "C"
    // folder that itself contains a subfolder named "C").
    if (rootFolder) {
        return { fpath: rootFolder, handle: undefined, fromMain };
    }

    let rootPath = findShortestPathInFnames(files.map((f) => f.fpath));

    // Fallback heuristic for flows without an explicit root (legacy/web). When we only received files
    // from subfolders `a|b|c` (no root-level files), the "shortest fpath" equals `${root}/a|b|c`, so we
    // lift root back to the parent. We only lift when nothing is nested deeper than `rootPath`; that way
    // a real root folder literally named "a"/"b"/"c" (which has files directly in it or in its own
    // a|b|c subfolders) is preserved instead of being mistaken for a subfolder.
    if (fromMain && rootPath) {
        const base = filenameWithoutPath(rootPath).toLowerCase();
        const looksLikeSubfolder = base === 'a' || base === 'b' || base === 'c';
        const hasDeeperFiles = files.some((f) => isPathDeeperThan(f.fpath, rootPath));
        if (looksLikeSubfolder && !hasDeeperFiles) {
            rootPath = pathWithoutFilename(rootPath);
        }
    }
    return {
        fpath: rootPath,
        handle: undefined,
        fromMain,
    };
}

/** True when `candidate` is strictly nested inside `base` (slash-agnostic, case-insensitive). */
function isPathDeeperThan(candidate: string, base: string): boolean {
    const norm = (p: string) => p.replace(/[\\/]+/g, '/').replace(/\/+$/, '').toLowerCase();
    const c = norm(candidate);
    const b = norm(base);
    return c.length > b.length && c.startsWith(b + '/');
}
