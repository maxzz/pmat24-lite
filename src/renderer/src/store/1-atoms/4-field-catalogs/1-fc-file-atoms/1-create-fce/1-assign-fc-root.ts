import { atom } from "jotai";
import { appSettings } from "@/store/9-ui-state";
import { type FileUs } from "@/store/store-types";
import { rootDir } from "../../../1-files";
import { defaultFcName } from "../../9-types";
import { doInitMruAtom } from "../../3-fc-mru";
import { setRootFcFileUs } from "./0-root-fce";
import { createFceAtomsInFileUs, createFileUsForNewFc } from "./2-create-fce-atoms";

export const doClearFcRootAtom = atom(
    null,
    (get, set) => {
        if (appSettings.files.shownManis.fcAllowed) { // If fcAllowed is changed then app reboot required
            assignFcRoot(undefined, { set });
        }
    }
);

export const doAddFcToLoadedAtom = atom(
    null,
    (get, set, { fileUsItems, clearFiles }: { fileUsItems: FileUs[]; clearFiles: boolean; }) => {
        if (clearFiles || !appSettings.files.shownManis.fcAllowed) { // Don't create field catalog if we clear files.
            return;
        }

        const newRootFc = assignFcRoot(fileUsItems, { set });
        if (newRootFc) {
            fileUsItems.push(newRootFc);
        }
    }
);

/**
 * Assign root field catalog from fileUsItems.
 * If the root field catalog is not among fileUsItems, it will be created and returned.
 */
function assignFcRoot(fileUs: FileUs[] | undefined, { set }: SetOnly): FileUs | undefined {
    let rv: FileUs | undefined;

    if (fileUs) {
        rv = updateFceAtomsRefs(fileUs); //TODO: and update counters in all files if empty field catalog was created
    } else {
        setRootFcFileUs(undefined);
    }

    set(doInitMruAtom);

    return rv;
}

function updateFceAtomsRefs(fileUsItems: FileUs[]): FileUs | undefined {
    let newlyCreatedFc: FileUs | undefined;

    // 1. Find root field catalog

    const rootPath = rootDir.fpath.toLowerCase();

    let rootFc: FileUs | undefined = findRootFc(fileUsItems, rootPath);
    if (!rootFc) {
        rootFc = createFileUsForNewFc();
        newlyCreatedFc = rootFc;
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

    // 3. Set root field catalog as master

    if (rootFc.fceAtomsForFcFile?.viewFceCtx) {
        rootFc.fceAtomsForFcFile.viewFceCtx.isMaster = true;
    }

    setRootFcFileUs(rootFc);

    return newlyCreatedFc;
}

/**
 * Find the root field catalog in fileUsItems.
 */
function findRootFc(fileUsItems: FileUs[], rootPath: string): FileUs | undefined {
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
