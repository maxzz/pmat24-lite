import { atom } from "jotai";
import { FieldTyp, FormIdx, Mani } from "@/store/8-manifest";
import { appSettings } from "@/store/9-ui-state";
import { filesAtom } from "@/store/5-1-open-files";
import { type FileUsAtom, type FileUs } from "@/store/store-types";
import { type FieldRowCtx, type ManualFieldState } from "@/store/2-file-mani-atoms";
import { type FceItem } from "../../9-types";
import { doPreloadManiAtomsAtom } from "@/store/5-3-right-panel";
import { getRootFceAtoms } from "../1-create-fce";

type FceItemsMap = Map<string, FceItem>; // dbname -> fceItem

/**
 * Create maniAtoms for fileUs if needed and then assign field catalog refs to maniAtoms
 */
export const doInitFileUsLinksToFcAtom = atom(null,
    (get, set, { fileUsAtoms, runningClearFiles }: { fileUsAtoms: FileUsAtom[]; runningClearFiles: boolean; }) => {
        if (!fileUsAtoms.length || runningClearFiles || !appSettings.files.shownManis.fcAllowed) { // Don't create field catalog if we clear files. //TODO: should we clear field catalog links if it was created?
            return;
        }

        const fceItems = get(getRootFceAtoms().allAtom);
        const fcQuickMap = fceItems.reduce<FceItemsMap>(
            (acc, item) => (acc.set(item.beforeEdit.dbname, item), acc), new Map()
        );

        //TODO: for each function below convert to named function

        fileUsAtoms.forEach(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);
                if (!fileUs.parsedSrc.mani || !fileUsHasFcRef(fileUs)) {
                    return;
                }

                set(doPreloadManiAtomsAtom, fileUsAtom);
                const maniAtoms = get(fileUs.maniAtomsAtom);
                if (!maniAtoms) {
                    return;
                }

                for (const formIdx of [FormIdx.login, FormIdx.cpass]) {
                    const form = maniAtoms[formIdx];

                    if (form?.normal) {
                        const fields: FieldRowCtx[] = form.normal?.rowCtxs || [];

                        for (const field of fields) {
                            if (field.metaField.ftyp === FieldTyp.button || field.metaField.mani.rfieldform !== Mani.FORMNAME.fieldcatalog) {
                                continue;
                            }

                            const fceItem = fcQuickMap.get(field.fromFile.dbname);
                            if (fceItem) {
                                set(field.fromFcAtom, fceItem);
                            } else {
                                field.metaField.mani.rfieldform = Mani.FORMNAME.brokenFcLink;
                            }
                            // printFceItem(fceItem, fileUs, field.fromFile.dbname);
                        }
                    }
                    else if (form?.manual) {
                        const chunks: ManualFieldState.Ctx[] = get(form?.manual.chunksAtom);

                        for (const chunk of chunks) {
                            if (chunk.type !== 'fld' || chunk.original.field.mani.rfieldform !== Mani.FORMNAME.fieldcatalog) {
                                continue;
                            }

                            const fceItem = fcQuickMap.get(chunk.rowCtx.fromFile.dbname);
                            if (fceItem) {
                                set(chunk.rowCtx.fromFcAtom, fceItem);
                            } else {
                                chunk.rowCtx.metaField.mani.rfieldform = Mani.FORMNAME.brokenFcLink;
                            }
                            // printFceItem(fceItem, fileUs, chunk.rowCtx.fromFile.dbname);
                        }
                    }
                }//for
            }
        );
    }
);

/**
 * Remove links to field catalog from all files when field catalog item is removed
 */
export const removeLinksToFceItemAtom = atom(null,
    (get, set, { fceItem }: { fceItem: FceItem; }) => {

        const filesAtoms = get(filesAtom);

        for (const fileAtom of filesAtoms) {
            const fileUs = get(fileAtom);
            if (!fileUs.parsedSrc.mani || !fileUsHasFcRef(fileUs)) {
                continue;
            }

            const maniAtoms = get(fileUs.maniAtomsAtom);
            if (!maniAtoms) {
                continue;
            }

            for (const formIdx of [FormIdx.login, FormIdx.cpass]) {
                const form = maniAtoms[formIdx];

                if (form?.normal) {
                    const fields: FieldRowCtx[] = form.normal?.rowCtxs || [];

                    for (const field of fields) {
                        if (field.metaField.ftyp === FieldTyp.button) {
                            continue;
                        }

                        if (get(field.fromFcAtom) === fceItem) {
                            set(field.fromFcAtom, undefined);
                            field.metaField.mani.rfieldform = Mani.FORMNAME.noname;
                        }
                    }
                } else if (form?.manual) {
                    const chunks: ManualFieldState.Ctx[] = get(form?.manual.chunksAtom);

                    for (const chunk of chunks) {
                        if (chunk.type !== 'fld') {
                            continue;
                        }

                        if (get(chunk.rowCtx.fromFcAtom) === fceItem) {
                            set(chunk.rowCtx.fromFcAtom, undefined);
                            chunk.rowCtx.metaField.mani.rfieldform = Mani.FORMNAME.noname;
                        }
                    }
                }
            }//for
        }
    }
);

function fileUsHasFcRef(fileUs: FileUs): boolean {
    if (!fileUs.parsedSrc.mani) {
        return false;
    }

    const forms = fileUs.parsedSrc.mani.forms || [];

    for (const form of forms) {
        const fields = form.fields || [];
        for (const field of fields) {
            if (field.rfieldform === Mani.FORMNAME.fieldcatalog) {
                return true;
            }
        }
    }

    return false;
}

function printFceItem(fceItem: FceItem | undefined, fileUs: FileUs, dbname: string) {
    console.log(`%c${fceItem ? '  ' : 'no'} assign ${dbname} ${fileUs.fileCnt.fname}`, `color: ${fceItem ? 'gray' : 'red'}`);
}

// function findByDbname(fceItems: FceItem[], dbname: string): FceItem | undefined {
//     return fceItems.find((item) => item.fieldValue.dbname === dbname);
// }
