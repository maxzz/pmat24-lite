import { atom } from 'jotai';
import type { FileUsAtomType } from "@/store/store-types";

// Files

export const filesAtom = atom<FileUsAtomType[]>([]);
