import { atom, type PrimitiveAtom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { type RowInputState } from "@/ui";
import { getManiDispNameAtomAtom } from "../../2-file-mani-atoms";

export type ConfirmatiionData = {
    resolve: (ok: boolean) => void;             // ok or cancel
};

export const doOpenConfirmDialogAtom = atom<ConfirmatiionData | undefined>(undefined);
