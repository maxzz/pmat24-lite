import { atom } from 'jotai';
import { filesAtom } from '../0-files-atom';
import { FileUsAtomType } from "@/store/store-types";
import { createRegexByFilter, isAnyCap, isAnyCls, isAnyWeb, isAnyWhy, isEmpty, isManual, useFileUsByFilter } from '@/store/store-utils';
import { searchFilterData } from '../../9-ui-state/04-filters-search';
import { fileListOptionsAtom } from '@/store/app-settings';
import { sortResult } from './2-filtered-sort';

export const filteredAtom = atom<FileUsAtomType[]>(
    (get) => {
        const { regex, winOnly, webOnly, whyOnly, capOnly, clsOnly } = createRegexByFilter(
            get(searchFilterData.textAtom),
            get(searchFilterData.caseSensitiveAtom)
        );

        // 1. Filter

        const fileListOptions = get(fileListOptionsAtom);

        const { showNormal, showManual, showEmpty, } = fileListOptions.shownManis;

        // const { showNormal, showManual, showEmpty, } = appSettings.ui.shownManis;

        const files = get(filesAtom);

        const rv = files.filter(
            (fileAtom: FileUsAtomType) => {
                const fileUs = get(fileAtom);

                if (capOnly) {
                    return isAnyCap(fileUs, regex);
                }

                if (clsOnly) {
                    return isAnyCls(fileUs, regex);
                }

                const isWeb = isAnyWeb(fileUs);
                if ((winOnly && isWeb) || (webOnly && !isWeb) || (whyOnly && !isAnyWhy(fileUs))) {
                    return false;
                }

                let useItNow = isEmpty(fileUs) ? showEmpty : isManual(fileUs) ? showManual : showNormal;
                if (useItNow && regex) {
                    useItNow = useFileUsByFilter(fileUs, regex);
                }
                return useItNow;
            }
        );

        // 2. Sort

        const { order, sortBy } = fileListOptions.filesSortOrder;

        sortResult(sortBy, order, rv, get);

        return rv;
    }

);
