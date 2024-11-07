import { type FileUs } from "@/store/store-types";
import { rootDir } from "../../1-files";
import { createEmptyFceFileUs } from "./2-create-empty-fce-fileus";

export function assignFceAtoms(fileUsItems: FileUs[]): void {

    // 1. Find root field catalog

    const rootPath = rootDir.rpath.toLowerCase();

    let rootFc: FileUs | undefined;

    const onlyFcs = fileUsItems.reduce((map, fileUs) => {
        if (fileUs.parsedSrc.fcat) {
            const fpath = fileUs.fileCnt.fpath.toLowerCase();
            const fname = fileUs.fileCnt.fname.toLowerCase();
            const isRoot = fname === 'field_catalog.dpn' && fpath === rootPath;
            if (isRoot) {
                rootFc = fileUs;
            } else {
                map[`${fpath}/${fname}`] = fileUs;
            }
        }
        return map;
    }, {} as Record<string, FileUs>);

    rootFc = rootFc || createEmptyFceFileUs();

    // 2. crete FceAtoms for each Fc fileUs

    // ... createEmptyFceRoot(rootFcFileUs?.fileCnt);

    // 3. assign FceAtoms to each fileUs

    fileUsItems.forEach(
        (fileUs) => {
            const goodForFc = !fileUs.parsedSrc.fcat && fileUs.fileCnt.fpath.toLowerCase().match(RegExp(`^${rootPath}/([a-c])`));
            if (goodForFc) {
                fileUs.fceAtomsRef = rootFc?.fceAtoms;
            }
        }
    );
}
