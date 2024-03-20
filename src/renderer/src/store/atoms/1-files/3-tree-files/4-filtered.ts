import { atom } from 'jotai';
import { filesAtom } from '../0-files-atom';
import { FileUsAtomType, Order, SortBy } from "@/store/store-types";
import { useFileUsByFilter } from '@/store/store-utils';
import { createRegexByFilter } from "@/store/store-utils/4-filters";
import { isAnyCap, isAnyCls, isAnyWeb, isAnyWhy, isEmpty, isManual } from "@/store/store-utils/3-mani-utils";
import { searchFilterData } from '../../9-ui-state/4-filters-search';
import { appSettings } from '@/store/app-settings';
import { busyIndicator } from '../../9-ui-state';

//import { busyAtom, orderAtom, searchFilterData, showManiAtoms, sortByAtom } from '../../9-ui-state';

export const filteredAtom = atom<FileUsAtomType[]>(
    (get) => {
        const { regex, winOnly, webOnly, whyOnly, capOnly, clsOnly } = createRegexByFilter(
            get(searchFilterData.textAtom),
            get(searchFilterData.caseSensitiveAtom)
        );

        const { showNormal, showManual, showEmpty, } = appSettings.ui.shownManis;

        const files = get(filesAtom);

        const isFilesLoading = !!busyIndicator.msg;
        if (isFilesLoading) {
            return files;
        }

        let result = files.filter((fileAtom: FileUsAtomType) => {
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
        });

        const { order, sortBy } = appSettings.ui.filesSortOrder;

        if (sortBy === SortBy.index) {
            if (order === Order.highToLow) {
                result.sort((atomA: FileUsAtomType, atomB: FileUsAtomType) => {
                    const fileUsA = get(atomA);
                    const fileUsB = get(atomB);
                    const a = fileUsA.idx;
                    const b = fileUsB.idx;
                    return a < b ? 1 : a > b ? -1 : 0;
                });
            }
        } else if (sortBy === SortBy.url) {
            result.sort((atomA: FileUsAtomType, atomB: FileUsAtomType) => {
                const fileUsA = get(atomA);
                const fileUsB = get(atomB);
                const a = fileUsA?.stats?.domain || 'zz';
                const b = fileUsB?.stats?.domain || 'zz';
                if (order === Order.lowToHigh) {
                    return a < b ? -1 : a > b ? 1 : 0;
                } else {
                    return a < b ? 1 : a > b ? -1 : 0;
                }
            });
        }

        return result;
    }
);
