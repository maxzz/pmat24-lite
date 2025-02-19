import { useSnapshot } from "valtio";
import { debugSettings } from "@/store";
import { WizardPage } from "../../../0-new-mani-ctx";
import { WizardPageHeader } from "../../../8-create-ui";
import { BodyRawXml } from "./1-body-xml";
import { BodyNewMani } from "./2-body-mani";

export function Page2FieldsBody() {
    const { showCreateSrcCode } = useSnapshot(debugSettings.debugOnly);
    return (
        <div className="h-full text-xs bg-sky-300 grid grid-rows-[auto,1fr,auto]">
            <WizardPageHeader page={WizardPage.fields} />

            <div className="relative size-full">
                <div className="absolute inset-0">
                    {showCreateSrcCode
                        ? <BodyRawXml />
                        : <BodyNewMani />
                    }
                </div>
            </div>
        </div>
    );
}
