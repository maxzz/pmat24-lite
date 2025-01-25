import { atom, type WritableAtom, type Atom, type PrimitiveAtom } from "jotai";
import { clamp } from "@/utils";
import { wizardFirstPage, wizardLastPage, type WizardPage } from "./8-step-items-data";

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

export function createDoMoveWizardPageAtom() {
    return atom(
        null,
        (get, set, { next }: { next: boolean; }) => {
            const currentPage = get(_pageAndDirectionAtom)[0];
            const page = clamp(currentPage + (next ? 1 : -1), wizardFirstPage, wizardLastPage);
            set(_pageAndDirectionAtom, [page, next ? 1 : -1]);
        }
    );
}
