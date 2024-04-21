import { Getter } from 'jotai';
import { FileUsAtomType, Order, SortBy } from "@/store/store-types";

export function sortResult(sortBy: SortBy, order: Order, result: FileUsAtomType[], get: Getter) {

    if (sortBy === SortBy.url) {
        result.sort(compareDomain_AtoZ);
    }
    else if (sortBy === SortBy.index) {
        if (order === Order.highToLow) {
            result.sort(CompareIndices_9to0);
        }
    }

    function CompareIndices_9to0(atomA: FileUsAtomType, atomB: FileUsAtomType) {
        const fileUsA = get(atomA);
        const fileUsB = get(atomB);

        const a = fileUsA.idx;
        const b = fileUsB.idx;
        return a < b ? 1 : a > b ? -1 : 0;
    }

    function compareDomain_AtoZ(atomA: FileUsAtomType, atomB: FileUsAtomType) {
        const fileUsA = get(atomA);
        const fileUsB = get(atomB);

        const a = fileUsA?.stats?.domain || 'zz';
        const b = fileUsB?.stats?.domain || 'zz';
        
        if (order === Order.lowToHigh) {
            return a < b ? -1 : a > b ? 1 : 0;
        } else {
            return a < b ? 1 : a > b ? -1 : 0;
        }
    }
}
