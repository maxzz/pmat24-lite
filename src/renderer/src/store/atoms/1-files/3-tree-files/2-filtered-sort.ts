import { type Getter } from 'jotai';
import { type FileUsAtom, Order, SortBy } from "@/store/store-types";

export function sortResult(sortBy: SortBy, order: Order, result: FileUsAtom[], get: Getter) {

    if (sortBy === SortBy.url) {
        result.sort(compareDomain_AtoZ);
    }
    else if (sortBy === SortBy.index) {
        if (order === Order.highToLow) {
            result.sort(CompareIndices_9to0);
        }
    }

    function CompareIndices_9to0(atomA: FileUsAtom, atomB: FileUsAtom) {
        const fileUsA = get(atomA);
        const fileUsB = get(atomB);

        const a = fileUsA.idx;
        const b = fileUsB.idx;
        return a < b ? 1 : a > b ? -1 : 0;
    }

    function compareDomain_AtoZ(atomA: FileUsAtom, atomB: FileUsAtom) {
        const fileUsA = get(atomA);
        const fileUsB = get(atomB);

        const a = fileUsA?.stats?.loginFormDomain || 'zz';
        const b = fileUsB?.stats?.loginFormDomain || 'zz';
        
        if (order === Order.lowToHigh) {
            return a < b ? -1 : a > b ? 1 : 0;
        } else {
            return a < b ? 1 : a > b ? -1 : 0;
        }
    }
}
