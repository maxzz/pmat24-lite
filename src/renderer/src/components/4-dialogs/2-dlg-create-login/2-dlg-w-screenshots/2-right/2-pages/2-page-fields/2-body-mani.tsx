import { useAtomValue } from "jotai";
import { ScrollArea } from "@/ui/shadcn";
import { newManiContent } from "@/components/4-dialogs/2-dlg-create-login";
import { ManiEditorFormSelector } from "@/components/2-main/2-right/2-file-mani/1-form-editor";
import { ManiEditorAllOptions } from "@/components/2-main/2-right/2-file-mani/2-form-options";

export function BodyNewMani() {
    const fileUs = useAtomValue(newManiContent.fileUsAtom);
    if (!fileUs) {
        return null;
    }

    console.log('New fileUs', fileUs);

    return (
        <ScrollArea className="px-2 py-1 size-full" fullHeight fixedWidth horizontal>
            <ManiEditorFormSelector fileUs={fileUs} formIdx={0} />
            <ManiEditorAllOptions fileUs={fileUs} />
        </ScrollArea>
    );
}
