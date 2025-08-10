import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames, doDissmissNextToastsAtom } from "@/utils";
import { doUpdateHwndAndIconAtom } from "@/store/1-atoms/7-dialogs";
import { debugSettings } from "@/store/9-ui-state";
import { Checkbox } from "@/ui";
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
    const { dummyCaption, doCpass } = useSnapshot(debugSettings.testCreate);
    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    const doUpdateHwndAndIcon = useSetAtom(doUpdateHwndAndIconAtom); // hwnd caption won't be updated by monitoring untill we force hwnd change
    return (
        <div className={classNames("grid grid-cols-[1fr,auto] gap-1 select-none", className)} {...rest}>
            <div className="px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto_auto] grid-rows-2 gap-x-2">
                <RowHwns />
                <RowManiContent />
            </div>

            <div className="flex flex-col justify-center gap-0.5">
                <label className="flex items-center gap-2">
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

                <label className="flex items-center gap-2">
                    <Checkbox
                        className="size-4"
                        checked={doCpass}
                        onCheckedChange={(v) => {
                            debugSettings.testCreate.doCpass = !!v;
                            doDissmissNextToasts();
                            doUpdateHwndAndIcon();
                        }}
                    />
                    <span className="whitespace-nowrap" title="2 lines fake caption">
                        change password
                    </span>
                </label>
            </div>
        </div>
    );
}
