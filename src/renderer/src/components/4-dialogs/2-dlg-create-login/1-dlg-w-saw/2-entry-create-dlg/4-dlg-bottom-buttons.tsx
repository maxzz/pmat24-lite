import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { doSaveNewManiTriggerAtom } from "@/store";

/**
 * Button Save button is always enabled to show toast as hint in case of failure.
 */
export function DialogBottemButtons({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const doSaveNewManiTrigger = useSetAtom(doSaveNewManiTriggerAtom);
    return (
        <div className={classNames("relative px-4 flex items-center justify-end gap-1", className)} {...rest}>
            <Button variant="default" size="xs" onClick={doSaveNewManiTrigger}>
                Save
            </Button>
        </div>
    );
}
