import { atom } from 'jotai';
import type { FileUsAtom } from "@/store/store-types";

// Files

export const filesAtom = atom<FileUsAtom[]>([]);

export const maniMenuOpenAtom = atom(false);
