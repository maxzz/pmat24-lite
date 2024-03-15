import { atom } from 'jotai';
import { FileUs, FileUsAtomType, FileUsStats } from "@/store/store-types";
import { files2Atom } from './0-files-atom';
import { doUpdateCacheAtom } from './4-do-update-cache';
//import { _foldAllCardsAtom } from '../9-ui-state';
//import { rightPanelData } from '../2-right-panel';
import { uuid } from '@/utils';

function pathWoFilename(fileHandle: File): string {
    const rv = ((fileHandle as any).path as string || '')
        .replace(/^\//, '')
        .split(/[\\\/]/);
    rv.pop(); // remove filename as the last item
    return rv.join('/');
}

export const doSetFilesAtom = atom(
    null,
    (get, set, accepterFiles: File[]) => {
        const droppedIn: FileUsAtomType[] = accepterFiles
            .filter((file) => file.size)
            .map(
                (fileHandle, idx) => {
                    const newFileUs: FileUs = {
                        id: uuid(),
                        idx,
                        fname: fileHandle.name,
                        fpath: pathWoFilename(fileHandle),
                        fmodi: fileHandle.lastModified || 0,
                        size: fileHandle.size,
                        file: fileHandle,
                        state: {
                            isGroupAtom: atom<boolean>(false),
                            isCurrentAtom: atom<boolean>(false),
                        },
                        stats: {} as FileUsStats, // the real one will be assigned after caching content
                    };
                    return atom<FileUs>(newFileUs);
                }
            );

        //set(_foldAllCardsAtom, -1);
        set(files2Atom, droppedIn);
        set(doUpdateCacheAtom);
        //set(rightPanelData.panelAtom, undefined);
    }
);
