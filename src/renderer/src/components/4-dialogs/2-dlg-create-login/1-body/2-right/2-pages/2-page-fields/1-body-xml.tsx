import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Button, ScrollArea } from "@/ui/shadcn";
import { Copy } from "lucide-react";
import { newManiCtx } from "../../../0-new-mani-ctx";

export function BodyRawXml() {
    const maniXml = useAtomValue(newManiCtx.maniXmlAtom);
    const { showUiHeader } = useSnapshot(appSettings.appUi.uiAdvanced);
    return (<>
        {showUiHeader && (
            <Button
                className="absolute right-2.5 top-0.5 active:scale-y-95 z-10" variant="ghost"
                onClick={() => navigator.clipboard.writeText(maniXml || '')}
            >
                <Copy className="size-4" />
            </Button>
        )}

        <ScrollArea className="px-2 py-1 size-full" fullHeight fixedWidth horizontal>
            <div className="whitespace-pre">
                {maniXml || ''}
            </div>
        </ScrollArea>
    </>);
}
