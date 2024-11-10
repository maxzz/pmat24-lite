// import type { FileUs } from "@/store/store-types";
// import type { Fce0Roots } from "../9-types/1-types-fce-atoms";
// import { createFromFileUsFceAtoms } from "./3-fc-file-to-fce-atoms";
// import { createEmptyFceAtoms } from './8-nun-create-empty-fce-atoms';

// // Field catalog should have name "field_catalog.dpn" and should be in the root folder.
// // Root "field_catalog.dpn" have impact on the root folder and A/B/C subfolders.
// // Other field catalogs should be ignored but it will be possible to edit without updating manifest files.

// export function createFldCatRoots(fileUsItems: FileUs[]): Fce0Roots {
//     const roots: Fce0Roots = {};

//     // 1. For each Field Catalog file create a FceRoot.
//     fileUsItems.forEach(
//         (fileUs) => {
//             if (fileUs.parsedSrc.fcat) {
//                 const fpath = fileUs.fileCnt.fpath || 'root';
//                 roots[fpath] = createFromFileUsFceAtoms(fileUs.fileCnt, fileUs.parsedSrc.fcat);
//             }
//         }
//     );

//     // 2. For each manifest file assign FceRoot
//     fileUsItems.forEach(
//         (fileUs) => {
//             if (!fileUs.parsedSrc.fcat) {
//                 const fpath = fileUs.fileCnt.fpath || 'root';
//                 if (!roots[fpath]) {
//                     roots[fpath] = createEmptyFceAtoms(fileUs.fileCnt);
//                 }
//                 fileUs.fce0Atoms = roots[fpath];
//             }
//         }
//     );

//     console.log('createFldCatRoots', roots);

//     return roots;
// }
