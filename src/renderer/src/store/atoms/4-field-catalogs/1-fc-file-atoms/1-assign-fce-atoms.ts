import { type FileUs } from "@/store/store-types";
import { rootDir } from "../../1-files";
import { createEmptyFceFileUs, createFceAtoms } from "./2-create-fce-atoms";
import { setRootFcFileUs } from "./0-fce-roots";
import { defaultFcName } from "../9-types";
import { createFceCtx } from "./4-create-fce-ctx";

export function assignFceAtoms(fileUsItems: FileUs[]): void {

    // 1. Find root field catalog

    const rootPath = rootDir.rpath.toLowerCase();

    let rootFc: FileUs | undefined;

    const onlyFcs = fileUsItems.reduce((map, fileUs) => {
        if (fileUs.parsedSrc.stats.isFCat) {
            const fpath = fileUs.fileCnt.fpath.toLowerCase();
            const fname = fileUs.fileCnt.fname.toLowerCase();
            const isRoot = fname === defaultFcName && fpath === rootPath;
            if (isRoot) {
                rootFc = fileUs;
            } else {
                map[`${fpath}/${fname}`] = fileUs;
            }
        }
        return map;
    }, {} as Record<string, FileUs>);

    if (!rootFc) {
        rootFc = createEmptyFceFileUs();
        fileUsItems.push(rootFc);
    } else {
        if (!rootFc.parsedSrc.fcat) {
            throw new Error('Field catalog file must have parsed content');
        }

        // const desc = rootFc.parsedSrc.fcat?.descriptor;
        // const items = rootFc.parsedSrc.fcat?.items;
        // rootFc.fceAtoms = createFceAtoms({ fileUs: rootFc, desc: undefined, items: undefined });
    }

    // 2. crete FceAtoms for each Fc fileUs

    // ... createEmptyFceRoot(rootFcFileUs?.fileCnt);

    // 3. assign FceAtoms to each fileUs

    fileUsItems.forEach(
        (fileUs) => {
            const goodForFc = !fileUs.parsedSrc.stats.isFCat && fileUs.fileCnt.fpath.toLowerCase().match(RegExp(`^${rootPath}/([a-c])$`));
            if (goodForFc) {
                fileUs.fceAtomsRef = rootFc?.fceAtoms;
            }
        }
    );

    setRootFcFileUs(rootFc);
}
