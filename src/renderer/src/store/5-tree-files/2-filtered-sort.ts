import { FileUs, type FileUsAtom, Order, SortBy } from "@/store/store-types";

export function sortResultInPlace(result: FileUsAtom[], sortBy: SortBy, order: Order, get: Getter) {

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

        const a = fileUsA.fileCnt.idx;
        const b = fileUsB.fileCnt.idx;
        return a < b ? 1 : a > b ? -1 : 0;
    }

    function compareDomain_AtoZ(atomA: FileUsAtom, atomB: FileUsAtom) {
        const fileUsA = get(atomA);
        const fileUsB = get(atomB);

        const a = fileUsA?.parsedSrc.stats?.loginFormDomain || 'zz';
        const b = fileUsB?.parsedSrc.stats?.loginFormDomain || 'zz';

        if (order === Order.lowToHigh) {
            return a < b ? -1 : a > b ? 1 : 0;
        } else {
            return a < b ? 1 : a > b ? -1 : 0;
        }
    }
}

export function sortFileUsItemsInPlaceAndSetIndices(items: FileUs[]) {
    items.sort(sortPredicate_RightAfterLoadByFname);
    items.forEach(
        (fileUs, idx) => fileUs.fileCnt.idx = idx
    );
    //TODO: and now apply real filer? do we need to sort before set indices (it will be filesystem order)? I think no. It is done in the get atom filteredAtom.
    //printSorted(items);
}

function sortPredicate_RightAfterLoadByFname(a: FileUs, b: FileUs): number { // Sort by name (from a to z, ie. ascending) and reindex w/ new field catalog index
    if (a.parsedSrc.fcat && !b.parsedSrc.fcat) {
        return 1;
    }

    if (!a.parsedSrc.fcat && b.parsedSrc.fcat) {
        return -1;
    }

    return a.fileCnt.fname.localeCompare(b.fileCnt.fname);
}

function printSorted(items: FileUs[]) {
    console.log('sortedFileUsItems',
        JSON.stringify(items.map(
            (item, idx) => `${`${idx}`.padStart(2, ' ')} ${`${item.fileCnt.idx}`.padStart(2, ' ')} ${item.fileCnt.fname}`
        ), null, 2));
}
