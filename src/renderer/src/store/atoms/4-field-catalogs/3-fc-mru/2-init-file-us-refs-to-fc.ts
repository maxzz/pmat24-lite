import { atom } from "jotai";
import { Mani } from "@/store/manifest";
import { FileUsAtom, type FileUs } from "@/store/store-types";
import { type FceItem } from "../9-types";
import { getRootFceAtoms } from "../1-fc-file-atoms";
import { doPreloadEditorCtxAtom } from "../../2-right-panel";
import { ManualFieldState, NormalField } from "../../3-file-mani-atoms";

type FceItemsMap = Map<string, FceItem>; // dbname -> fceItem

export const doInitFileUssRefsToFcAtom = atom(null,
    (get, set, fileUsAtoms: FileUsAtom[]) => {
        if (!fileUsAtoms) {
            return;
        }

        const fceItems = get(getRootFceAtoms().allAtom);
        const fcMap = fceItems.reduce<FceItemsMap>(
            (acc, item) => (acc.set(item.beforeEdit.dbname, item), acc), new Map()
        );

        fileUsAtoms.forEach(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);
                if (!fileUs.parsedSrc.mani || !fileUsHasFcRef(fileUs)) {
                    return;
                }

                // Create maniAtoms for fileUs and assign FC ref to maniAtoms

                set(doPreloadEditorCtxAtom, fileUsAtom);

                const maniAtoms = get(fileUs.maniAtomsAtom);
                if (!maniAtoms) {
                    return;
                }

                for (const form of maniAtoms) {
                    if (form?.normal) {
                        const fields: NormalField.RowCtx[] = form.normal?.rowCtxs || [];

                        for (const field of fields) {
                            if (field.metaField.mani.rfieldform !== Mani.FORMNAME.fieldcatalog) {
                                continue;
                            }
                            
                            const fceItem = fcMap.get(field.fromFile.dbname);
                            if (fceItem) {
                                field.fromFc = fceItem;
                                // console.log(`assign ${field.fromFile.dbname} ${fileUs.fileCnt.fname}`);
                            } else {
                                field.metaField.mani.rfieldform = Mani.FORMNAME.noname; // This field is not from field catalog anymore
                                // console.log(`%cno assign ${field.fromFile.dbname} ${fileUs.fileCnt.fname}`, 'color: red');
                            }
                        }
                    }
                    else if (form?.manual) {
                        const chunks: ManualFieldState.Ctx[] = get(form?.manual.chunksAtom);

                        for (const chunk of chunks) {
                            if (chunk.type === 'fld') {
                                if (chunk.original.field.mani.rfieldform !== Mani.FORMNAME.fieldcatalog) {
                                    continue;
                                }

                                const fceItem = fcMap.get(chunk.rowCtx.fromFile.dbname);
                                if (fceItem) {
                                    chunk.rowCtx.fromFc = fceItem;
                                    // console.log(`assign ${chunk.rowCtx.fromFile.dbname} ${fileUs.fileCnt.fname}`);
                                } else {
                                    chunk.rowCtx.metaField.mani.rfieldform = Mani.FORMNAME.noname; // This field is not from field catalog anymore
                                    // console.log(`%cno assign ${chunk.rowCtx.fromFile.dbname} ${fileUs.fileCnt.fname}`, 'color: red');
                                }
                            }
                        }
                    }
                }//for
            }
        );
    }
);

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

export function removeLinksToFc(fileUs: FileUs) {
    if (!fileUs.parsedSrc.mani) {
        return;
    }

    const mani = fileUs.parsedSrc.mani;
    const maniForms = mani.forms || [];

    for (const maniForm of maniForms) {
        const maniFormFields = maniForm.fields || [];
        for (const maniFormField of maniFormFields) {
            if (maniFormField.rfieldform === Mani.FORMNAME.fieldcatalog) {
            }
        }
    }
}
