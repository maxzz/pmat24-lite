import { useAtom, useAtomValue } from "jotai";
import { ScrollArea } from "@/ui/shadcn";
import { WizardPageHeader } from "../../../8-create-ui";
import { newManiCtx, WizardPage } from "../../../0-new-mani-ctx";

export function Page2FieldsBody() {
    const maniXml = useAtomValue(newManiCtx.maniXmlAtom);
    return (
        <div className="h-full text-xs bg-sky-300 grid grid-rows-[auto,1fr,auto]">
            <WizardPageHeader page={WizardPage.fields} />

            <div className="relative size-full">
                <div className="absolute inset-0">
                    <ScrollArea className="px-2 py-1 size-full" fullHeight fixedWidth>
                        <div className="whitespace-nowrap">
                            {maniXml || ''}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
