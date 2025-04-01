import { useSnapshot } from "valtio";
import { debugSettings } from "@/store";
import { BodyRawXml } from "./1-body-xml";
import { BodyNewMani } from "./2-body-mani";

export function ContentEditorSelector() {
    const { showCreateSrcCode } = useSnapshot(debugSettings.debugOnly);
    return (
        <div className="relative size-full">
            <div className="absolute inset-0">

                {showCreateSrcCode
                    ? <BodyRawXml />
                    : <BodyNewMani />
                }

            </div>
        </div>
    );
}
