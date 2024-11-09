import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { filesAtom } from "../0-files-atom";
import { isAnyCap, isAnyCls, isAnyWeb, isAnyWhy, isEmpty, isManual } from "@/store/manifest";
import { createRegexByFilter, useFileUsByFilter } from "@/store/store-utils";
import { searchFilterData } from "../../9-ui-state/04-filters-search";
import { fileListOptionsAtom } from "@/store";
import { sortResult } from "./2-filtered-sort";

export const filteredAtom = atom<FileUsAtom[]>(
    (get) => {
        const { regex, winOnly, webOnly, whyOnly, capOnly, clsOnly } = createRegexByFilter(
            get(searchFilterData.textAtom),
            get(searchFilterData.caseSensitiveAtom)
        );

        // 1. Filter

        const fileListOptions = get(fileListOptionsAtom);

        const { showNormal, showManual, showEmpty, showFldCat } = fileListOptions.shownManis; // fileListOptions is allready atomWithProxy

        const files = get(filesAtom);

        const rv = files.filter(
            (fileAtom: FileUsAtom) => {
                const fileUs = get(fileAtom);
                const { mani, meta, stats: { isFCat } } = fileUs.parsedSrc;

                if (isFCat && !showFldCat) {
                    return false;
                }

                if (!isFCat && !mani) {
                    return false;
                }

                if (capOnly) {
                    return isAnyCap(mani, regex);
                }

                if (clsOnly) {
                    return isAnyCls(mani, regex);
                }

                const isWeb = isAnyWeb(meta);
                if ((winOnly && isWeb) || (webOnly && !isWeb) || (whyOnly && !isAnyWhy(meta))) {
                    return false;
                }

                let useItNow = isEmpty(meta) ? showEmpty : isManual(meta) ? showManual : showNormal;
                if (useItNow && regex) {
                    useItNow = useFileUsByFilter(fileUs, regex);
                }
                return useItNow;
            }
        );

        // 2. Sort

        const { order, sortBy } = fileListOptions.sortOrder;

        sortResult(sortBy, order, rv, get);

        return rv;
    }

);
