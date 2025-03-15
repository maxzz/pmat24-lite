import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames, doDissmissNextToastsAtom } from "@/utils";
import { debugSettings } from "@/store";
import { Checkbox } from "@/ui";
import { doUpdateHwndAndIconAtom } from "../3-dlg-w-saw/0-ctx";
import { RowHwns } from "./1-row-hwnds";
import { RowScreenshots } from "./2-row-screenshots";
import { RowManiContent } from "./3-row-manis";

export function DebugButtonsForScreenshots({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto_auto] grid-rows-2 gap-x-2 select-none", className)} {...rest}>
            <RowScreenshots />
            <RowManiContent />
        </div>
    );
}

export function DebugButtonsForSaw({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const { dummyCaption } = useSnapshot(debugSettings.testCreate);
    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    const doUpdateHwndAndIcon = useSetAtom(doUpdateHwndAndIconAtom); // hwnd caption won't be updated by monitoring untill we force hwnd change
    return (
        <div className={classNames("grid grid-cols-[1fr,auto] gap-1 select-none", className)} {...rest}>
            <div className="px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto_auto] grid-rows-2 gap-x-2">
                <RowHwns />
                <RowManiContent />
            </div>

            <label className="place-self-start py-1 flex items-center gap-2">
                <Checkbox
                    className="size-4"
                    checked={dummyCaption}
                    onCheckedChange={(v) => {
                        debugSettings.testCreate.dummyCaption = !!v;
                        doDissmissNextToasts();
                        doUpdateHwndAndIcon();
                    }}
                />
                <span className="whitespace-nowrap" title="2 lines fake caption">
                    fake caption
                </span>
            </label>
        </div>
    );
}
