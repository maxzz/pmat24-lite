import { atom } from "jotai";
import { debounce } from "@/utils";
import { type ValueLife } from "@/store/8-manifest";
import { type FceCtx } from "../../9-types";
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

        debouncedOnChangeFcePropWithScope(selectedItem, props, get, set); //TODO: perhaps not a good idea to debounce changes on object members
    },
);

const debouncedOnChangeFcePropWithScope = debounce(handleFcePropChanges, 500);
