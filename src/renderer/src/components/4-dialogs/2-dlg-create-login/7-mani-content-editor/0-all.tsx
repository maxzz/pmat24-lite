import { useSnapshot } from "valtio";
import { debugSettings } from "@/store";
import { BodyRawXml } from "./1-body-xml";
import { BodyNewMani } from "./2-body-mani";
// import { TimeUtils } from "pm-manifest";

export function ContentEditorSelector() {
    const { showCreateSrcCode } = useSnapshot(debugSettings.debugOnly);

    // get precision timer of milliseconds as human readable string
    // const timeStr = TimeUtils.dpTimeToShow(Date.now());
    // const timeStr = Date.now().toString();
    // const timeStr = new Date().toISOString();
    // const timeStr = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: false });
    // const timeStr = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 });
    
    // get precision timer to show only current time minutes and milliseconds as human readable string
    const timeStr = new Date().toLocaleString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 });
    
    console.log('ContentEditorSelector render', {time: timeStr});
    
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
