import { atom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";
import { createManiAtoms } from "@/store/0-serve-atoms/0-create/0-create-mani-ctx-atoms";
import { rootDir } from "@/store/5-1-open-files";
import { filenameWithoutPath } from "@/utils";
import { print_FileUsAtomLinks } from "./8-print-fileus-atom-links";

export const rightPanelAtomAtom = atom<FileUsAtom | undefined>(undefined);

let agentRightPanelSeq = 0;

/**
 * Non reactive getter for right panel atom
 */
export const rightPanelAtomGetterAtom = atom(
    null,
    (get): FileUsAtom | undefined => {
        return get(rightPanelAtomAtom);
    }
);

/**
 * set tree item to render in the right panel
 */
export const doTriggerRightPanelSelectedAtom = atom(
    null,
    (get, set, { newAtom }: { newAtom: FileUsAtom | undefined; }): void => {
        const seq = ++agentRightPanelSeq;
        // #region agent log: right panel selection change
        try {
            const rootBase = filenameWithoutPath(rootDir.fpath);
            const newAtomStr = newAtom ? newAtom.toString() : 'undefined';
            const fname =
                newAtom
                    ? (() => {
                        try {
                            const fileUs = get(newAtom);
                            return fileUs?.fileCnt?.fname;
                        } catch {
                            return undefined;
                        }
                    })()
                    : undefined;

            fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' },
                body: JSON.stringify({
                    sessionId: '327545',
                    runId: 'open-folder-pre',
                    hypothesisId: 'H_RP',
                    location: 'src/renderer/src/store/5-3-right-panel/1-right-panel-atom.tsx:doTriggerRightPanelSelectedAtom',
                    message: 'right panel selection change',
                    data: { seq, action: newAtom ? 'select' : 'clear', rootBase, rootLen: rootDir.fpath.length, newAtomStr, fname },
                    timestamp: Date.now()
                })
            }).catch(() => { });

            typeof tmApi !== 'undefined'
                && tmApi.invokeMain({
                    type: 'r2mi:debug-log',
                    payload: {
                        sessionId: '327545',
                        runId: 'open-folder-pre',
                        hypothesisId: 'H_RP',
                        location: 'src/renderer/src/store/5-3-right-panel/1-right-panel-atom.tsx:doTriggerRightPanelSelectedAtom:ipc',
                        message: 'right panel selection change',
                        data: { seq, action: newAtom ? 'select' : 'clear', rootBase, rootLen: rootDir.fpath.length, newAtomStr, fname },
                        timestamp: Date.now(),
                    }
                }).catch(() => { });
        } catch { }
        // #endregion

        set(doPreloadManiAtomsAtom, newAtom);
        set(rightPanelAtomAtom, newAtom);
        //printFileUsAtomLinks(rightPanelAtomAtom, { get });
    }
);

/**
 * Preload mani/fce atoms for the right panel item
 */
export const doPreloadManiAtomsAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom | undefined): void => {
        if (fileUsAtom) {
            try {
                const fileUs = get(fileUsAtom);

                if (fileUs.parsedSrc.mani) { // no need to preload fceAtoms they are always created when fc loaded
                    const maniAtoms = get(fileUs.maniAtomsAtom);
                    !maniAtoms && set(fileUs.maniAtomsAtom, createManiAtoms({ fileUs, fileUsAtom }));
                }
            } catch (error) {
                // #region agent log: right panel preload exception
                try {
                    const msg = error instanceof Error ? error.message : String(error);
                    fetch('http://127.0.0.1:7743/ingest/6fd41623-7507-4d84-81c9-37300c23dd21', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '327545' },
                        body: JSON.stringify({
                            sessionId: '327545',
                            runId: 'open-folder-pre',
                            hypothesisId: 'H_RP',
                            location: 'src/renderer/src/store/5-3-right-panel/1-right-panel-atom.tsx:doPreloadManiAtomsAtom:exception',
                            message: 'right panel preload exception',
                            data: { msg, fileUsAtomStr: fileUsAtom.toString() },
                            timestamp: Date.now()
                        })
                    }).catch(() => { });

                    typeof tmApi !== 'undefined'
                        && tmApi.invokeMain({
                            type: 'r2mi:debug-log',
                            payload: {
                                sessionId: '327545',
                                runId: 'open-folder-pre',
                                hypothesisId: 'H_RP',
                                location: 'src/renderer/src/store/5-3-right-panel/1-right-panel-atom.tsx:doPreloadManiAtomsAtom:exception:ipc',
                                message: 'right panel preload exception',
                                data: { msg, fileUsAtomStr: fileUsAtom.toString() },
                                timestamp: Date.now(),
                            }
                        }).catch(() => { });
                } catch { }
                // #endregion
                throw error;
            }
        }
    }
);

/**
 * Get access to the fileUsAtom of the right panel item.
 */
export const fileUsOfRightPanelAtom = atom(
    (get): FileUs | undefined => {
        const currentAtom = get(rightPanelAtomAtom);
        return currentAtom ? get(currentAtom) : undefined;
    },
);

export const maniAtomsOfRightPanelAtom = atom(
    (get): ManiAtoms | undefined | null => {
        const fileUs = get(fileUsOfRightPanelAtom);
        return fileUs?.maniAtomsAtom && get(fileUs.maniAtomsAtom);
    },
);

/**
 * Return fileUsAtom if file has cpass form. Use it for cpass add/delete buttons.
 */
export const getCpassFileUsAtom = atom(
    (get): FileUsAtom | undefined => {
        const currentAtom = get(rightPanelAtomAtom);
        const fileUs = currentAtom && get(currentAtom);
        if (!fileUs || fileUs.parsedSrc.stats.isFCat) {
            return undefined;
        }
        const maniAtoms = get(fileUs.maniAtomsAtom);
        return maniAtoms?.[FormIdx.cpass] && currentAtom;
    },
);
