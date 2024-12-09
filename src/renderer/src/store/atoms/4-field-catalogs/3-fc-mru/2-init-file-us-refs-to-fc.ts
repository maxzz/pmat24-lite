import { atom } from "jotai";
import { FieldTyp, Mani } from "@/store/manifest";
import { FileUsAtom, type FileUs } from "@/store/store-types";
import { type FceItem } from "../9-types";
import { getRootFceAtoms } from "../1-fc-file-atoms";
import { doPreloadEditorCtxAtom } from "../../2-right-panel";
import { ManualFieldState, NormalField } from "../../3-file-mani-atoms";
import { filesAtom } from "../../1-files";

type FceItemsMap = Map<string, FceItem>; // dbname -> fceItem

/**
 * Create maniAtoms for fileUs if needed and assign FC ref to maniAtoms
 */
export const doInitFileUssRefsToFcAtom = atom(null,
    (get, set, fileUsAtoms: FileUsAtom[]) => {
        if (!fileUsAtoms) {
            return;
        }

        const fceItems = get(getRootFceAtoms().allAtom);
        const fcMap = fceItems.reduce<FceItemsMap>(
            (acc, item) => (acc.set(item.beforeEdit.dbname, item), acc), new Map()
        );

        //TODO: for each function below convert to named function

        fileUsAtoms.forEach(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);
                if (!fileUs.parsedSrc.mani || !fileUsHasFcRef(fileUs)) {
                    return;
                }

                set(doPreloadEditorCtxAtom, fileUsAtom);
                const maniAtoms = get(fileUs.maniAtomsAtom);
                if (!maniAtoms) {
                    return;
                }

                for (const form of maniAtoms) {
                    if (form?.normal) {
                        const fields: NormalField.RowCtx[] = form.normal?.rowCtxs || [];

                        for (const field of fields) {
                            if (field.metaField.ftyp === FieldTyp.button || field.metaField.mani.rfieldform !== Mani.FORMNAME.fieldcatalog) {
                                continue;
                            }

                            const fceItem = fcMap.get(field.fromFile.dbname);
                            if (fceItem) {
                                field.fromFc = fceItem;
                            } else {
                                field.metaField.mani.rfieldform = Mani.FORMNAME.noname; // This field is not from field catalog anymore
                            }
                            console.log(`%c${fceItem ? '  ' : 'no'} assign ${field.fromFile.dbname} ${fileUs.fileCnt.fname}`, `color: ${fceItem ? 'gray' : 'red'}`);
                        }
                    }
                    else if (form?.manual) {
                        const chunks: ManualFieldState.Ctx[] = get(form?.manual.chunksAtom);

                        for (const chunk of chunks) {
                            if (chunk.type !== 'fld' || chunk.original.field.mani.rfieldform !== Mani.FORMNAME.fieldcatalog) {
                                continue;
                            }

                            const fceItem = fcMap.get(chunk.rowCtx.fromFile.dbname);
                            if (fceItem) {
                                chunk.rowCtx.fromFc = fceItem;
                            } else {
                                chunk.rowCtx.metaField.mani.rfieldform = Mani.FORMNAME.noname; // This field is not from field catalog anymore
                            }
                            console.log(`%c${fceItem ? '  ' : 'no'} assign ${chunk.rowCtx.fromFile.dbname} ${fileUs.fileCnt.fname}`, `color: ${fceItem ? 'gray' : 'red'}`);
                        }
                    }
                }//for
            }
        );
    }
);

//TODO: combine file icons in separated by slash if forms are mixed (manual and normal)
//TODO: add option to show only root and A/B/C folder and ignore other sub-folders

function fileUsHasFcRef(fileUs: FileUs): boolean {
    if (!fileUs.parsedSrc.mani) {
        return false;
    }

    const maniForms = fileUs.parsedSrc.mani.forms || [];

    for (const maniForm of maniForms) {
        const maniFormFields = maniForm.fields || [];
        for (const maniFormField of maniFormFields) {
            if (maniFormField.rfieldform === Mani.FORMNAME.fieldcatalog) {
                return true;
            }
        }
    }

    return false;
}

// function findByDbname(fceItems: FceItem[], dbname: string): FceItem | undefined {
//     return fceItems.find((item) => item.fieldValue.dbname === dbname);
// }

export const removeLinksToFcAtom = atom(null,
    (get, set, { fceItem }: { fceItem: FceItem; }) => {

        const files = get(filesAtom);

        for (const file of files) {
            const fileUs = get(file);
            if (!fileUs.parsedSrc.mani || !fileUsHasFcRef(fileUs)) {
                continue;
            }

            const maniAtoms = get(fileUs.maniAtomsAtom);
            if (!maniAtoms) {
                continue;
            }

            for (const form of maniAtoms) {
                if (form?.normal) {
                    const fields: NormalField.RowCtx[] = form.normal?.rowCtxs || [];

                    for (const field of fields) {
                        if (field.metaField.ftyp === FieldTyp.button) {
                            continue;
                        }

                        if (field.fromFc === fceItem) {
                            field.fromFc = undefined;
                            field.metaField.mani.rfieldform = Mani.FORMNAME.noname;
                        }
                    }
                } else if (form?.manual) {
                    const chunks: ManualFieldState.Ctx[] = get(form?.manual.chunksAtom);

                    for (const chunk of chunks) {
                        if (chunk.type !== 'fld') {
                            continue;
                        }

                        if (chunk.rowCtx.fromFc === fceItem) {
                            chunk.rowCtx.fromFc = undefined;
                            chunk.rowCtx.metaField.mani.rfieldform = Mani.FORMNAME.noname;
                        }
                    }
                }
            }//for
        }            
    }
);
