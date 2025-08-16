import { useSnapshot } from "valtio";
import { debugSettings } from "@/store/9-ui-state";
import { NewManiContentBody } from "./1-new-mani-mani-body";
import { NewManiContentRawXmlBody } from "./2-new-mani-xml-body";

export function NewManiContentEditorSelector() {
    const { showCreateSrcCode } = useSnapshot(debugSettings.debugOnly);
    return (
        <div className="relative size-full">
            <div className="absolute inset-0">

                {showCreateSrcCode
                    ? <NewManiContentRawXmlBody />
                    : <NewManiContentBody />
                }

            </div>
        </div>
    );
}
