import { WizardPage } from "../../../0-new-mani-ctx";
import { Checkbox, ScrollArea } from "@/ui/shadcn";
import { WizardPageHeader } from "../../../8-create-ui";
import { AppsGrid } from "./1-apps-grid";
import { ButtonReloadApps } from "./2-button-refresh-apps";

export function Page1AppsBody() {
    return (
        <div className="h-full text-xs grid grid-rows-[auto,1fr,auto]">
            <div className="flex items-center justify-between gap-2">
                <WizardPageHeader page={WizardPage.apps} />

                <ButtonReloadApps />
            </div>

            <div className="relative size-full">
                <div className="absolute inset-3">
                    <ScrollArea className="px-2 py-1 size-full bg-muted/50 border border-border rounded-md" fullHeight fixedWidth>
                        <AppsGrid />
                    </ScrollArea>
                </div>
            </div>

            <div className="px-3 pb-3 flex items-center  gap-2">
                <Checkbox className="" checked={true} />
                Define manifest content manually
            </div>
        </div>
    );
}
