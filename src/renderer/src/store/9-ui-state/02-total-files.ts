import { proxy } from "valtio";
import { type FileUs } from "@/store/store-types";
import { isAnyEmpty, isAnyManual } from "@/store/8-manifest";

export type TotalManis = {
    manual: number;         // manual mode manifests
    normal: number;         // normal mode manifests
    empty: number;          // empty manifests
    fc: number;             // field catalogs
};

export const totalManis = proxy<TotalManis>({ // total manifests
    manual: 0,
    normal: 0,
    empty: 0,
    fc: 0,
});

// Utilities

export function clearTotalManis() {
    totalManis.manual = 0;
    totalManis.normal = 0;
    totalManis.empty = 0;
    totalManis.fc = 0;
}

export function addToTotalManis(fileUs: FileUs) {
    const { fcat, meta } = fileUs.parsedSrc;
    if (fcat) {
        totalManis.fc++;
    } else if (isAnyEmpty(meta)) {
        totalManis.empty++;
    } else if (isAnyManual(meta)) {
        totalManis.manual++;
    } else {
        totalManis.normal++;
    }
}

export function removeFromTotalManis(fileUs: FileUs) {
    const { fcat, meta } = fileUs.parsedSrc;
    if (fcat) {
        totalManis.fc--;
    } else if (isAnyEmpty(meta)) {
        totalManis.empty--;
    } else if (isAnyManual(meta)) {
        totalManis.manual--;
    } else {
        totalManis.normal--;
    }
}
