import { useAtom } from "jotai";
import { Checkbox, Label } from "@/ui/shadcn";
import { PreserveScrollArea } from "@/ui/local-ui";
import { newManiCtx, WizardPage } from "../../../0-new-mani-ctx";
import { WizardPageHeader } from "../../../8-create-ui";
import { AppsGrid } from "./1-apps-grid";
import { ButtonReloadApps } from "./2-btn-refresh-apps";

export function Page1AppsBody() {
    const [createAsManual, setCreateAsManual] = useAtom(newManiCtx.createAsManualAtom);
    return (
        <div className="h-full text-xs grid grid-rows-[auto_1fr_auto]">
            <div className="flex items-center justify-between gap-2">
                <WizardPageHeader page={WizardPage.apps} />

                <ButtonReloadApps />
            </div>

            <div className="relative size-full">
                <div className="absolute inset-3">
                    <PreserveScrollArea
                        className="px-2 py-1 size-full bg-muted/50 border border-border rounded-md"
                        fullHeight fixedWidth storage={newManiCtx.appsScrollPos}
                    >
                        <AppsGrid />
                    </PreserveScrollArea>
                </div>
            </div>

            <Label className="place-self-start px-3 pb-3 inline-flex items-center gap-2 cursor-pointer">
                <Checkbox checked={createAsManual} onCheckedChange={(v: boolean) => setCreateAsManual(v)} />
                Define manifest content manually
            </Label>
        </div>
    );
}

//TODO: switch storage to atom and reset on dialog close
//TODO: long ops feedback
