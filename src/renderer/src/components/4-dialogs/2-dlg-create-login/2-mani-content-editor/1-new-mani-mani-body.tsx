import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { ScrollArea } from "@/ui/shadcn";
import { appSettings } from "@/store/9-ui-state";
import { newManiFileUsAtom } from "@/store/0-serve-atoms/0-create/1-create-new-mani-ctx";
import { ManiEditorFormSelector } from "@/components/2-main/2-right/2-file-mani/1-form-editor";
import { ManiEditorAllOptions } from "@/components/2-main/2-right/2-file-mani/2-form-options";
import { printManiBodyFileUsAtom } from "@/components/2-main/2-right/2-file-mani";

export function NewManiContentBody() {
    const fileUs = useAtomValue(newManiFileUsAtom);
    if (!fileUs) {
        return null;
    }

    printManiBodyFileUsAtom(newManiFileUsAtom, fileUs, ' (this is derived atom from newManiContent.newFileUsAtomAtom)');

    return (
        <ScrollArea className="@container/tab-content px-2 py-1 size-full" fullHeight fixedWidth horizontal>
            <ManiEditorFormSelector fileUs={fileUs} formIdx={0} />
        </ScrollArea>
    );
}

function BodyNewManiOld() {
    const showOptOnRight = useSnapshot(appSettings.appUi.uiGeneral).showOptOnRight;

    const fileUs = useAtomValue(newManiFileUsAtom);
    if (!fileUs) {
        return null;
    }

    return (
        <ScrollArea className="@container/tab-content px-2 py-1 size-full" fullHeight fixedWidth horizontal>

            <div className={classNames(labelClasses, showOptOnRight ? 'text-end': '')}>
                Form fields
            </div>

            <ManiEditorFormSelector fileUs={fileUs} formIdx={0} />

            <div className={classNames(labelClasses, showOptOnRight ? 'text-end': '')}>
                Form submit options
            </div>

            <ManiEditorAllOptions fileUs={fileUs} />
        </ScrollArea>
    );
}

const labelClasses = "ml-2 mt-1 mb-1 text-xs font-semibold select-none";
