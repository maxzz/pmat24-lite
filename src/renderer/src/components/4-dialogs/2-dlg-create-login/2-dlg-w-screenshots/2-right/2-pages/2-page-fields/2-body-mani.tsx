import { useAtomValue } from "jotai";
import { ScrollArea } from "@/ui/shadcn";
import { ctxContent } from "@/components/4-dialogs/2-dlg-create-login";
import { ManiEditorFormSelector } from "@/components/2-main/2-right/2-file-mani/1-form-editor";
import { ManiEditorAllOptions } from "@/components/2-main/2-right/2-file-mani/2-form-options";

export function BodyNewMani() {
    const fileUs = useAtomValue(ctxContent.fileUsAtom);
    if (!fileUs) {
        return null;
    }
    
    console.log('BodyNewMani', fileUs);
    
    return (<>
        <ScrollArea className="px-2 py-1 size-full" fullHeight fixedWidth horizontal>
            <ManiEditorFormSelector fileUs={fileUs} formIdx={0} />
            <ManiEditorAllOptions fileUs={fileUs} />
        </ScrollArea>
    </>);
}
