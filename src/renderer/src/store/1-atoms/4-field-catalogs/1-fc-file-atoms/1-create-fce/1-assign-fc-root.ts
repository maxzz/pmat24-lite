import { type Getter, type Setter } from "jotai";
import { type FileUs } from "@/store/store-types";
import { rootDir } from "../../../1-files";
import { setRootFcFileUs } from "./0-root-fce";
import { createFceAtomsInFileUs, createFileUsForNewFc } from "./2-create-fce-atoms";
import { defaultFcName } from "../../9-types";
import { doInitMruAtom } from "../../3-fc-mru";

/**
 * Assign root field catalog from fileUsItems.
 * If the root field catalog is not among fileUsItems, it will be created and returned.
 */
export function assignFcRoot(fileUs: FileUs[] | undefined, get: Getter, set: Setter): FileUs | undefined {

    let rv: FileUs | undefined

    if (fileUs) {
        rv = updateFceAtomsRefs(fileUs); //TODO: and update counters in all files if empty field catalog was created
    } else {
        setRootFcFileUs(undefined);
    }
    
    set(doInitMruAtom);

    return rv;
}

function updateFceAtomsRefs(fileUsItems: FileUs[]): FileUs | undefined {

    // 1. Find root field catalog

    const rootPath = rootDir.rpath.toLowerCase();

    let rootFc: FileUs | undefined = undefined as unknown as FileUs;


    rootFc = findRootFc(fileUsItems, rootPath);

    let newRootFc: FileUs | undefined;

    if (!rootFc) {
        rootFc = createFileUsForNewFc();
        newRootFc = rootFc;
    }

    // 2. Assign FceAtoms ref to each fileUs

    fileUsItems.forEach(
        (fileUs) => {
            const goodForFc = !fileUs.parsedSrc.stats.isFCat && fileUs.fileCnt.fpath.toLowerCase().match(RegExp(`^${rootPath}(?:[/\\][a-c])*$`));
            if (goodForFc) {
                fileUs.fceAtomsRefForMani = rootFc.fceAtomsForFcFile;
            }
        }
    );

    if (rootFc.fceAtomsForFcFile?.viewFceCtx) {
        rootFc.fceAtomsForFcFile.viewFceCtx.isMaster = true;
    }

    setRootFcFileUs(rootFc);

    return newRootFc;
}

function findRootFc(fileUsItems: FileUs[], rootPath: string): FileUs | undefined {

    // 1. Find root field catalog

    let rootFc: FileUs = undefined as unknown as FileUs;

    const onlyFcs = fileUsItems.reduce(
        (acc, fileUs) => {
            if (fileUs.parsedSrc.stats.isFCat) {
                const fpath = fileUs.fileCnt.fpath.toLowerCase();
                const fname = fileUs.fileCnt.fname.toLowerCase();

                createFceAtomsInFileUs(fileUs);

                const isRoot = fname === defaultFcName && fpath === rootPath;
                if (isRoot) {
                    rootFc = fileUs;
                } else {
                    acc[`${fpath}/${fname}`] = fileUs;
                }
            }
            return acc;
        }, {} as Record<string, FileUs>
    );

    return rootFc;
}
