import { atom } from "jotai";
import { FileUs, type FileUsAtom } from "@/store/store-types";
import { filesAtom } from "@/store/5-1-open-files";
import { isAnyMatchedCap, isAnyMatchedCls, isAnyWeb, isAnyWhy, isAnyEmpty, isAnyManual, FormIdx } from "@/store/8-manifest";
import { optionsAppUiProxyAtom, optionsFilesProxyAtom } from "@/store/9-ui-state";
import { createRegexByFilter, useFileUsByFilter } from "@/store/store-utils";
import { searchFilterData } from "@/store/9-ui-state/04-filters-search";
import { sortResultInPlace } from "./2-filtered-sort";
import { type ManiAtoms } from "../2-file-mani-atoms";

/**
 * We don't filter items by filename, but by manifest content only.
 */
export const filteredAtom = atom<FileUsAtom[]>(
    (get) => {
        const { regex, winOnly, webOnly, whyOnly, capOnly, clsOnly, extOnly } = createRegexByFilter(
            get(searchFilterData.textAtom),
            get(searchFilterData.caseSensitiveAtom)
        );

        // 1. Filter

        const { shownManis: { showNormal, showManual, showEmpty, fcAllowed }, sortOrder: { order, sortBy } } = get(optionsFilesProxyAtom);
        const skipFc = !fcAllowed || !get(optionsAppUiProxyAtom).uiAdvanced.showFieldCatalog;

        const files = get(filesAtom);
        //printFilterFiles(files, get);

        const rv = files.filter(
            (fileAtom: FileUsAtom) => {
                const fileUs = get(fileAtom);
                const { mani, meta, stats: { isFCat } } = fileUs.parsedSrc;

                if (!isFCat && !mani) {
                    return false;
                }

                if (isFCat && skipFc) {
                    return false;
                }

                if (capOnly) {
                    return isAnyMatchedCap(mani, regex);
                }

                if (clsOnly) {
                    return isAnyMatchedCls(mani, regex);
                }

                if (extOnly) {
                    return isAnyMatchedExtPolicy(fileUs, get);
                }

                const isWeb = isAnyWeb(meta);
                if ((winOnly && isWeb) || (webOnly && !isWeb) || (whyOnly && !isAnyWhy(meta))) {
                    return false;
                }

                let useItNow = isAnyEmpty(meta) ? showEmpty : isAnyManual(meta) ? showManual : showNormal;
                if (useItNow && regex) {
                    useItNow = useFileUsByFilter(fileUs, regex);
                }
                return useItNow;
            }
        );

        // 2. Sort

        sortResultInPlace(rv, sortBy, order, get);

        return rv;
    }
);

function isAnyMatchedExtPolicy(fileUs: FileUs, get: Getter): boolean {
    const maniAtoms = get(fileUs.maniAtomsAtom);
    const loginFormCtx = maniAtoms?.[FormIdx.login];
    if (!loginFormCtx) {
        return false;
    }
    const options = get(loginFormCtx.options.p3Auth.auth_plAtom).data;
    return !!options;
}

export const isFilterActiveAtom = atom(
    (get) => {
        const files = get(filesAtom);
        const filtered = get(filteredAtom);
        return files.length !== filtered.length;
    }
);

// Utilities

function printFilterFiles(files: FileUsAtom[], get: Getter) {
    console.log(`%c All files before filter: lenght=${files.length} `, 'background-color: green; color: white');
    files.forEach(
        (fileUsAtom) => {
            const fileUs = get(fileUsAtom);
            if (fileUs?.fileCnt) {
                console.log(
                    `\t\ttreeAtom:%c${fileUsAtom.toString()} %cuuid:${fileUs.fileCnt.unid} fname:"${fileUs.fileCnt.fname}"`,
                    'font-weight: normal; color: magenta',
                    'font-weight: normal; color: gray',
                    { fileUs }
                );
            } else {
                console.error(`\t\t: null${fileUsAtom.toString()}`, { fileUs });
            }
        }
    );
}
