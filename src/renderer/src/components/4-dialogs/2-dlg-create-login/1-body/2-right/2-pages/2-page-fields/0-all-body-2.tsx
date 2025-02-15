import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Button, ScrollArea } from "@/ui/shadcn";
import { Copy } from "lucide-react";
import { newManiCtx, WizardPage } from "../../../0-new-mani-ctx";
import { WizardPageHeader } from "../../../8-create-ui";

export function Page2FieldsBody() {
    const maniXml = useAtomValue(newManiCtx.maniXmlAtom);
    const { showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced);
    return (
        <div className="h-full text-xs bg-sky-300 grid grid-rows-[auto,1fr,auto]">
            <WizardPageHeader page={WizardPage.fields} />

            <div className="relative size-full">
                <div className="absolute inset-0">

                    {showUiHeader && (
                        <Button
                            className="absolute right-4 top-0.5 active:scale-y-95 z-10" variant="ghost"
                            onClick={() => navigator.clipboard.writeText(maniXml || '')}
                        >
                            <Copy className="size-4" />
                        </Button>
                    )}

                    <ScrollArea className="px-2 py-1 size-full" fullHeight fixedWidth>
                        <div className="whitespace-pre">
                            {maniXml || ''}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
