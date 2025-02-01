import { useState } from "react";
import { useSetAtom } from "jotai";
import { doSetScreenshotsAtom } from "@/store";
import { ButtonCreateFormSelector, WizardPageHeader } from "../../../8-create-ui";
import { AppsGrid } from "./1-apps-grid";
import { ScrollArea } from "@/ui/shadcn";
import { WizardPage } from "../../../9-new-mani-ctx";


export function Page1AppsBody() {
    // const doSetScreenshots = useSetAtom(doSetScreenshotsAtom);
    // useState(() => doSetScreenshots(300));
    return (
        <div className="h-full text-xs grid grid-rows-[auto,1fr,auto]">
            <WizardPageHeader page={WizardPage.apps} />

            <div className="relative h-full w-full">
                <div className="absolute inset-0">
                    <ScrollArea className="px-2 py-1 size-full" fullHeight fixedWidth>
                        <AppsGrid />
                    </ScrollArea>
                </div>
            </div>

            <div className="px-1 py-2 bg-muted/30 border-t border-border">
                <ButtonCreateFormSelector triggerLabel="Create new manifest" />
            </div>
        </div>
    );
}
