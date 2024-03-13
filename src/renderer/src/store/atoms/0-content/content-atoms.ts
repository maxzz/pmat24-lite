import { atom } from "jotai";
import { type FileContent } from "@shared/ipc-types";

/**
 * File content is coming from different sources:
```
┌───────────────────────────────────────────┬─────────────────────────────────────┐
│ with electron                             │ without electron                    │
├───────────────────────────────────────────┼─────────────────────────────────────┤
│ from renderer                             │ from web process only               │
│ ─────────────                             │ ─────────────────────               │
│     dropped filenames                     │     dropped files                   │
│         just files from a single folder   │ just files from a single folder     │
│         (no folders or subfolders)        │ or if dropped folder then           │
│                                           │ files and folders w/ relative path  │ 
├───────────────────────────────────────────┼─────────────────────────────────────┤
│ from main process                         │ from web process only               │
│ ─────────────────                         │ ─────────────────────               │
│     dialog open files                     │     dialog open files               │
│         just files from a single folder   │     just files from a single folder │
│         (no folders or subfolders)        │     (no folders or subfolders)      │
├───────────────────────────────────────────┼─────────────────────────────────────┤
│ from main process                         │                                     │
│ ─────────────────                         │                                     │
│     dialog open folder                    │                                     │
│         from a single chosen folder       │                                     │
│         all files and folders recursively │                                     │
└───────────────────────────────────────────┴─────────────────────────────────────┘
```
*/
export const deliveredAtom = atom<FileContent[]>([]);   // files content populated from web or electron environments

export const filesAtom = atom<FileContent[]>([]);       // files with reactive content and IDs

export const filteredAtom = atom<FileContent[]>([]);    // files to show in the tree
