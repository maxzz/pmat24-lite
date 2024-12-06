import { type Getter, type Setter } from "jotai";
import { type FileUs } from "@/store/store-types";
import { rootDir } from "../../../1-files";
import { setRootFcFileUs } from "./0-root-fce-atoms";
import { assignFceAtomsToFileUs, createEmptyFceFileUs } from "./2-create-fce-atoms";
import { defaultFcName } from "../../9-types";
import { doInitMruAtom } from "../../3-fc-mru";

export function updateRootFc(fileUs: FileUs[] | undefined, get: Getter, set: Setter) {
    if (fileUs) {
        assignFceAtoms(fileUs); //TODO: and update conters if empty field catalog was created
    } else {
        setRootFcFileUs(undefined);
    }
    set(doInitMruAtom);
}

function assignFceAtoms(fileUsItems: FileUs[]): void {

    // 1. Find root field catalog

    let rootFc: FileUs = undefined as unknown as FileUs;

    const rootPath = rootDir.rpath.toLowerCase();

    const onlyFcs = fileUsItems.reduce(
        (acc, fileUs) => {
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
        }, {} as Record<string, FileUs>
    );

    if (!rootFc) {
        rootFc = createEmptyFceFileUs();
        fileUsItems.push(rootFc);
    }

    // 2. Assign FceAtoms ref to each fileUs

    fileUsItems.forEach(
        (fileUs) => {
            const goodForFc = !fileUs.parsedSrc.stats.isFCat && fileUs.fileCnt.fpath.toLowerCase().match(RegExp(`^${rootPath}(?:[/\\][a-c])*$`));
            if (goodForFc) {
                fileUs.fceAtomsRef = rootFc.fceAtoms;
            }
        }
    );

    if (rootFc.fceAtoms?.viewFceCtx) {
        rootFc.fceAtoms.viewFceCtx.isMaster = true;
    }

    setRootFcFileUs(rootFc);
}
