import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Button, ScrollArea } from "@/ui/shadcn";
import { Copy } from "lucide-react";
import { newManiCtx, WizardPage } from "../../../0-new-mani-ctx";
import { WizardPageHeader } from "../../../8-create-ui";
import { BodyRawXml } from "./1-body-xml";

export function Page2FieldsBody() {
    return (
        <div className="h-full text-xs bg-sky-300 grid grid-rows-[auto,1fr,auto]">
            <WizardPageHeader page={WizardPage.fields} />

            <div className="relative size-full">
                <div className="absolute inset-0">
                    <BodyRawXml />
                </div>
            </div>
        </div>
    );
}
