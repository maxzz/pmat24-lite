import { atom } from "jotai";
import { Mani } from "@/store/manifest";
import { FileUsAtom, type FileUs } from "@/store/store-types";
import { type FceItem } from "../9-types";
import { getRootFceAtoms } from "../1-fc-file-atoms";
import { doPreloadEditorCtxAtom } from "../../2-right-panel";

type FceItemsMap = Map<string, FceItem>; // dbname -> fceItem

export const doInitFileUssRefsToFcAtom = atom(null,
    (get, set, fileUsAtoms: FileUsAtom[]) => {
        if (!fileUsAtoms) {
            return;
        }

        const fceItems = get(getRootFceAtoms().allAtom);
        const fceItemsMap = fceItems.reduce(
            (acc, item) => {
                acc.set(item.beforeEdit.dbname, item);
                return acc;
            }, new Map<string, FceItem>()
        );

        fileUsAtoms.forEach(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);
                if (!fileUs.parsedSrc.mani) {
                    return;
                }

                // Create maniAtoms for fileUs and assign FC ref to maniAtoms

                if (fileUsHasFcRef(fileUs)) {
                    set(doPreloadEditorCtxAtom, fileUsAtom);

                    const maniAtoms = get(fileUs.maniAtomsAtom);
                    if (!maniAtoms) {
                        return;
                    }

                    for (const maniForm of maniAtoms) {
                        if (maniForm?.normal) {
                            const maniFormFields = maniForm.normal?.rowCtxs || [];
                            for (const maniFormField of maniFormFields) {
                                if (maniFormField.metaField.mani.rfieldform !== Mani.FORMNAME.fieldcatalog) {
                                    continue;
                                }
                                const fceItem = fceItemsMap.get(maniFormField.fromFile.dbname);
                                if (fceItem) {
                                    maniFormField.fromFc = fceItem;
                                } else {
                                    maniFormField.metaField.mani.rfieldform = Mani.FORMNAME.noname; // This field is not from field catalog anymore
                                }
                            }
                        }
                        else if (maniForm?.manual) {
                            //TODO: assign maniForm.manual.rowCtxs to maniForm.manual.ctx.rowCtxs
                            console.log(`assign maniForm.manual.rowCtxs to maniForm.manual.ctx.rowCtxs ${fileUs.fileCnt.fname}`);
                        }
                    }
                }
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

function findByDbname(fceItems: FceItem[], dbname: string): FceItem | undefined {
    return fceItems.find((item) => item.fieldValue.dbname === dbname);
}

//getRootFceAtoms

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
