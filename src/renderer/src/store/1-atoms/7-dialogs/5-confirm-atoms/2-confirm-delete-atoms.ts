import { atom, type PrimitiveAtom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { type RowInputState } from "@/ui";
import { getManiDispNameAtomAtom } from "../../2-file-mani-atoms";

export const doOpenConfirmDeleteDialogAtom = atom(false);
