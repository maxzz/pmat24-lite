import { useState } from "react";
import { useSetAtom } from "jotai";
import { doSetScreenshotsAtom } from "@/store";
import { ButtonCreateFormSelector, WizardPageHeader } from "../../8-create-ui";
import { ScrollArea } from "@/ui/shadcn";
import { AppsGrid } from "../1-page-apps/1-apps-grid";
import { WizardPage } from "../../9-new-mani-ctx";

export function Page3OptionsBody() {
    // const doSetScreenshots = useSetAtom(doSetScreenshotsAtom);
    // useState(() => doSetScreenshots(300));
    return (
        <div className="h-full text-xs bg-yellow-300 grid grid-rows-[auto,1fr,auto]">
            <WizardPageHeader page={WizardPage.options} />

            <div className="relative h-full w-full">
                <div className="absolute inset-0">
                    {/* <ScrollArea className="px-2 py-1 size-full" fullHeight fixedWidth>
                        <AppsGrid />
                    </ScrollArea> */}
                    3-page-options
                </div>
            </div>

            {/* <div className="px-1 py-2 bg-muted/30 border-t border-border">
                <ButtonCreateFormSelector triggerLabel="Create new manifest" />
            </div> */}
        </div>
    );
}
