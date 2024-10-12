import { atom } from 'jotai';
import type { FileUsAtom } from "@/store/store-types";

// Files

export const filesAtom = atom<FileUsAtom[]>([]);

//TODO: This cannot be shared for main top or file list panel menu, but anyway we'll have only one of them

export const maniMenuOpenAtom = atom(false);
