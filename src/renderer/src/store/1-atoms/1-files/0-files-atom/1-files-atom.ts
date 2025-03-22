import { atom } from 'jotai';
import type { FileUsAtom } from "@/store/store-types";

// Files

export const filesAtom = atom<FileUsAtom[]>([]);

// Root folder

export const rootFolderAtom = atom(''); // root folder path //TODO: add for web version folder handle
