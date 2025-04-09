import { type Getter, atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { filesAtom } from "../0-files-atom";
import { isAnyMatchedCap, isAnyMatchedCls, isAnyWeb, isAnyWhy, isAnyEmpty, isAnyManual } from "@/store/manifest";
import { createRegexByFilter, useFileUsByFilter } from "@/store/store-utils";
import { searchFilterData } from "../../9-ui-state/04-filters-search";
import { optionsAppUiProxyAtom, optionsFilesProxyAtom } from "@/store";
import { sortResult } from "./2-filtered-sort";

export const filteredAtom = atom<FileUsAtom[]>(
    (get) => {
        const { regex, winOnly, webOnly, whyOnly, capOnly, clsOnly } = createRegexByFilter(
            get(searchFilterData.textAtom),
            get(searchFilterData.caseSensitiveAtom)
        );

        // 1. Filter

        const optionsFileList = get(optionsFilesProxyAtom);
        const showFieldCatalog = get(optionsAppUiProxyAtom).uiAdvanced.showFieldCatalog;

        const { showNormal, showManual, showEmpty, fcAllowed: showFldCat } = optionsFileList.shownManis;

        const files = get(filesAtom);
        //printFilterFiles(files, get);

        const rv = files.filter(
            (fileAtom: FileUsAtom) => {
                const fileUs = get(fileAtom);
                const { mani, meta, stats: { isFCat } } = fileUs.parsedSrc;

                if (isFCat && (!showFldCat || !showFieldCatalog)) {
                    return false;
                }

                if (!isFCat && !mani) {
                    return false;
                }

                if (capOnly) {
                    return isAnyMatchedCap(mani, regex);
                }

                if (clsOnly) {
                    return isAnyMatchedCls(mani, regex);
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

        const { order, sortBy } = optionsFileList.sortOrder;
        sortResult(sortBy, order, rv, get);

        return rv;
    }

);

function printFilterFiles(files: FileUsAtom[], get: Getter) {
    console.log('before filter: lenght =', files.length);
    files.forEach(
        (fileUsAtom) => {
            const fileUs = get(fileUsAtom);
            if (fileUs?.fileCnt) {
                console.log('\t\t', fileUs.fileCnt.unid, fileUsAtom.toString(), fileUs.fileCnt.fname, { fileUs });
            } else {
                console.error('\t\t: null', fileUs, fileUsAtom.toString());
            }
        }
    );
}
