import { FileUsStats, type FileUs } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type FceRoots } from "../9-types-fc";
import { rootDir } from "../../1-files";
import { createEmptyFceRoot, fieldCatToFceRoot } from "./8-fc-file-to-fc-root";
import { finalizeFileContent } from "@/store/store-utils";
import { extensionWoDot } from "@/utils";
import { atom } from "jotai";
import { ManiAtoms } from "../../3-file-mani-atoms";

// Field catalog should have name "field_catalog.dpn" and should be in the root folder.
// Root "field_catalog.dpn" have impact on the root folder and A/B/C subfolders.
// Other field catalogs should be ignored but it will be possible to edit without updating manifest files.

export function createFldCatRoots(fileUsItems: FileUs[]): FceRoots {
    const roots: FceRoots = {};

    // 1. For each Field Catalog file create a FceRoot.

    fileUsItems.forEach(
        (fileUs) => {
            if (fileUs.parsedSrc.fcat) {
                const fpath = fileUs.fileCnt.fpath || 'root';
                roots[fpath] = fieldCatToFceRoot(fileUs.fileCnt, fileUs.parsedSrc.fcat);
            }
        }
    );

    // 2. For each manifest file assign FceRoot

    fileUsItems.forEach(
        (fileUs) => {
            if (!fileUs.parsedSrc.fcat) {
                const fpath = fileUs.fileCnt.fpath || 'root';
                if (!roots[fpath]) {
                    roots[fpath] = createEmptyFceRoot(fileUs.fileCnt);
                }
                fileUs.fceAtoms = roots[fpath];
            }
        }
    );

    console.log('createFldCatRoots', roots);

    return roots;
}

export function createFldCatRoot(fileUsItems: FileUs[]) {

    const rootFcFileUs = fileUsItems.find((fileUs) => fileUs.parsedSrc.fcat && fileUs.fileCnt.fname === 'field_catalog.dpn' && fileUs.fileCnt.fpath === '');

    let rootFc = createEmptyFceRoot(rootFcFileUs?.fileCnt);


}

export function createEmptyFceAtoms(): FileUs {
    const fileCnt: FileContent = finalizeFileContent(null);

    const rv: FileUs = {
        fileCnt,
        parsedSrc: {
            mani: undefined,
            meta: undefined,
            fcat: undefined,
            stats: {} as FileUsStats,
        },
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        maniAtomsAtom: atom<ManiAtoms | null>(null),
        fceAtomsRef: undefined,
        fceAtoms: undefined,
    };
    return rv;
}

export function assignFceAtoms(fileUsItems: FileUs[]): void {

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

    rootFc = rootFc || createEmptyFceAtoms();

    fileUsItems.forEach(
        (fileUs) => {
            const goodForFc = !fileUs.parsedSrc.fcat && fileUs.fileCnt.fpath.toLowerCase().match(RegExp(`^${rootPath}/([a-c])`));
            if (goodForFc) {
                fileUs.fceAtomsRef = rootFc?.fceAtoms;
            }
        }
    );
}
