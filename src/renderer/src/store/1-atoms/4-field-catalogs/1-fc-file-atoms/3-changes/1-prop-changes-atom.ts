import { atom } from "jotai";
import { type FceCtx } from "../../9-types";
import { type ValueLife } from "@/store/manifest";
import { debounce } from "@/utils";
import { handleFcePropChanges } from "./2-handle-fce-prop-changes";

export type FcePropChangesProps = {
    fceCtx: FceCtx;
    name: string;
    nextValue: string | ValueLife;
};

export const doFcePropChangesAtom = atom(
    null,
    (get, set, props: FcePropChangesProps) => {
        const selectedItem = get(props.fceCtx.selectedItemAtom);
        if (!selectedItem) {
            return;
        }

        debouncedHandleFcePropChanges(selectedItem, props, get, set); //TODO: perhaps not a good idea to debounce changes on object members
    },
);

const debouncedHandleFcePropChanges = debounce(handleFcePropChanges, 500);
