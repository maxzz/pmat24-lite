import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { Button, ScrollArea } from "@/ui/shadcn";
import { Copy } from "lucide-react";
import { appSettings } from "@/store/9-ui-state";
import { newManiContent } from "@/store/0-serve-atoms";

export function NewManiContentRawXmlBody() {

    const maniXml = useAtomValue(newManiContent.maniXmlStrAtom);
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
