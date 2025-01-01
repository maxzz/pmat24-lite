import { atom } from "jotai";
import { FieldTyp, Mani } from "@/store/manifest";
import { type FileUsAtom, type FileUs } from "@/store/store-types";
import { type FceItem } from "../../9-types";
import { filesAtom } from "../../../1-files";
import { getRootFceAtoms } from "../1-create-fce";
import { doPreloadEditorCtxAtom } from "../../../2-right-panel";
import { type ManualFieldState, type NormalField } from "../../../3-file-mani-atoms";

type FceItemsMap = Map<string, FceItem>; // dbname -> fceItem

/**
 * Create maniAtoms for fileUs if needed and then assign field catalog refs to maniAtoms
 */
export const doInitFileUsLinksToFcAtom = atom(null,
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

                            // printFceItem(fceItem, fileUs, field.fromFile.dbname);
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

                            // printFceItem(fceItem, fileUs, chunk.rowCtx.fromFile.dbname);
                        }
                    }
                }//for
            }
        );
    }
);

function printFceItem(fceItem: FceItem | undefined, fileUs: FileUs, dbname: string) {
    console.log(`%c${fceItem ? '  ' : 'no'} assign ${dbname} ${fileUs.fileCnt.fname}`, `color: ${fceItem ? 'gray' : 'red'}`);
}

// function findByDbname(fceItems: FceItem[], dbname: string): FceItem | undefined {
//     return fceItems.find((item) => item.fieldValue.dbname === dbname);
// }

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
