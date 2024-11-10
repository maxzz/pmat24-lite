// import { atom } from "jotai";
// import { type FileContent } from "@shared/ipc-types";
// import { type Fce0Atoms, type Fce0Ctx, type FceItem } from "../9-types";
// import { finalizeFileContent } from "@/store/store-utils";

// export function createEmptyFceAtoms(fileCnt: FileContent | null | undefined): Fce0Atoms {
//     const rv: Fce0Atoms = {
//         fileCnt: fileCnt || finalizeFileContent(null),
//         fceCtxAtom: atom<Fce0Ctx | null>(null),
//         descriptor: {},
//         items: atom<FceItem[]>([]),
//     };
//     return rv;
// }
