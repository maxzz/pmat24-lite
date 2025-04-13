import { type ComponentPropsWithoutRef } from "react";
import { atom, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { doClearSawHandleAtom, doOpenDlgNewManiSawAtom, doSaveNewManiAtom } from "@/store";

/**
 * Button Save button is always enabled to show toast as hint in case of failure.
 */
export function DialogBottemButtons({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const doSaveTrigger = useSetAtom(doSaveTriggerAtom);
    return (
        <div className={classNames("relative px-4 flex items-center justify-end gap-1", className)} {...rest}>
            <Button variant="default" size="xs" onClick={doSaveTrigger}>
                Save
            </Button>
        </div>
    );
}

const doSaveTriggerAtom = atom(
    null,
    async (get, set) => {
        const saved = await set(doSaveNewManiAtom);
        if (saved) {
            set(doOpenDlgNewManiSawAtom, false);
            set(doClearSawHandleAtom); // Turn off fields highlight

            //TODO: for password change form it wiil be different
        }
    }
);
