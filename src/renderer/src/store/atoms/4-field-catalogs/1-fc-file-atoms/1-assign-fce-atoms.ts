import { type FileUs } from "@/store/store-types";
import { rootDir } from "../../1-files";
import { assignFceAtomsToFileUs, createEmptyFceFileUs } from "./2-create-fce-atoms";
import { setRootFcFileUs } from "./0-root-fce-atoms";
import { defaultFcName } from "../9-types";

export function assignFceAtoms(fileUsItems: FileUs[]): void {

    // 1. Find root field catalog
    
    let rootFc: FileUs = undefined as unknown as FileUs;
    
    const rootPath = rootDir.rpath.toLowerCase();

    const onlyFcs = fileUsItems.reduce((acc, fileUs) => {
        if (fileUs.parsedSrc.stats.isFCat) {
            const fpath = fileUs.fileCnt.fpath.toLowerCase();
            const fname = fileUs.fileCnt.fname.toLowerCase();
            
            assignFceAtomsToFileUs(fileUs);

            const isRoot = fname === defaultFcName && fpath === rootPath;
            if (isRoot) {
                rootFc = fileUs;
            } else {
                acc[`${fpath}/${fname}`] = fileUs;
            }
        }
        return acc;
    }, {} as Record<string, FileUs>);

    if (!rootFc) {
        rootFc = createEmptyFceFileUs();
        fileUsItems.push(rootFc);
    }

    // 2. Assign FceAtoms ref to each fileUs

    fileUsItems.forEach(
        (fileUs) => {
            const goodForFc = !fileUs.parsedSrc.stats.isFCat && fileUs.fileCnt.fpath.toLowerCase().match(RegExp(`^${rootPath}/([a-c])$`));
            if (goodForFc) {
                fileUs.fceAtomsRef = rootFc.fceAtoms;
            }
        }
    );

    setRootFcFileUs(rootFc);
}
