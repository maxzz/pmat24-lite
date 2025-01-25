import { atom } from "jotai";
import { type WizardPage, wizardFirstPage, wizardLastPage } from "./8-step-items-data";
import { clamp } from "@/utils";

export type PageAndDirection = [page: WizardPage, direction: number];

const _pageAndDirectionAtom = atom<PageAndDirection>([wizardFirstPage, 0]);

export function createPageAndDirectionAtom() {
    return _pageAndDirectionAtom;
}

export function createCurrentPageAtom() {
    return atom((get) => {
        return get(_pageAndDirectionAtom)[0];
    });
}

export function createDoAdvancePageAtom() {
    return atom(
        null,
        (get, set, { next }: { next: boolean; }) => {
            const currentPage = get(_pageAndDirectionAtom)[0];
            const page = clamp(currentPage + (next ? 1 : -1), wizardFirstPage, wizardLastPage);
            set(_pageAndDirectionAtom, [page, next ? 1 : -1]);
        }
    );
}

export type CreateDoAdvancePageAtom = ReturnType<typeof createDoAdvancePageAtom>; // WritableAtom<null, [{ next: boolean; }], void>
