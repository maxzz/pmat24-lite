import { useState } from "react";
import { useSetAtom } from "jotai";
import { doSetScreenshotsAtom } from "@/store";
import { ButtonCreateFormSelector } from "../../8-create-ui";
import { ScrollArea } from "@/ui/shadcn";
import { AppsGrid } from "../1-page-apps/1-apps-grid";

export function Page4SaveBody() {
    // const doSetScreenshots = useSetAtom(doSetScreenshotsAtom);
    // useState(() => doSetScreenshots(300));
    return (
        <div className="h-full text-xs bg-green-300 grid grid-rows-[auto,1fr,auto]">
            <div className="px-2 py-1 text-sm bg-muted/30">
                Select the login window for which you will create a manifest.
            </div>

            <div className="relative h-full w-full">
                <div className="absolute inset-0">
                    {/* <ScrollArea className="px-2 py-1 size-full" fullHeight fixedWidth>
                        <AppsGrid />
                    </ScrollArea> */}
                    4-page-save
                </div>
            </div>

            {/* <div className="px-1 py-2 bg-muted/30 border-t border-border">
                <ButtonCreateFormSelector triggerLabel="Create new manifest" />
            </div> */}
        </div>
    );
}
