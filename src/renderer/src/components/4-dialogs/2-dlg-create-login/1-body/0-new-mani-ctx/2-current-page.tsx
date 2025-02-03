import { type Atom, atom } from "jotai";
import { type WizardPage, wizardFirstPage, wizardLastPage } from "./8-step-items-data";
import { clamp } from "@/utils";

export type PageAndDirection = [page: WizardPage, direction: number];

const _pageAndDirectionAtom = atom<PageAndDirection>([wizardFirstPage, 0]);

export function create_PageAndDirectionAtom() {
    return _pageAndDirectionAtom;
}

export function create_CurrentPageAtom(): Atom<WizardPage> {
    return atom((get) => {
        return get(_pageAndDirectionAtom)[0];
    });
}

export function create_DoAdvancePageAtom() {
    return atom(
        null,
        (get, set, { next }: { next: boolean; }) => {
            const currentPage = get(_pageAndDirectionAtom)[0];
            const page = clamp(currentPage + (next ? 1 : -1), wizardFirstPage, wizardLastPage);
            set(_pageAndDirectionAtom, [page, next ? 1 : -1]);
        }
    );
}

export type DoAdvancePageAtom = ReturnType<typeof create_DoAdvancePageAtom>; // WritableAtom<null, [{ next: boolean; }], void>
