import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Button, ScrollArea } from "@/ui/shadcn";
import { Copy } from "lucide-react";
import { newManiCtx } from "../../../0-new-mani-ctx";
import { ManiEditorFormSelector } from "@/components/2-main/2-right/2-file-mani/1-form-editor";
import { ManiEditorAllOptions } from "@/components/2-main/2-right/2-file-mani/2-form-options";

export function BodyNewMani() {
    const fileUs = useAtomValue(newManiCtx.fileUsAtom);
    console.log('BodyNewMani', fileUs);
    
    if (!fileUs) {
        return null;
    }
    return (<>
        <ScrollArea className="px-2 py-1 size-full" fullHeight fixedWidth horizontal>
            <ManiEditorFormSelector fileUs={fileUs} formIdx={0} />
            <ManiEditorAllOptions fileUs={fileUs} />
        </ScrollArea>
    </>);
}
