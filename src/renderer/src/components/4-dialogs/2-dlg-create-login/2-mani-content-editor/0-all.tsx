import { useSnapshot } from "valtio";
import { debugSettings } from "@/store";
import { BodyNewMani } from "./1-body-mani";
import { BodyRawXml } from "./2-body-xml";

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
