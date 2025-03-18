import { useSnapshot } from "valtio";
import { debugSettings } from "@/store";
import { BodyRawXml } from "./1-body-xml";
import { BodyNewMani } from "./2-body-mani";
import { printPrecitionTime } from "./debug-time";
// import { TimeUtils } from "pm-manifest";

export function ContentEditorSelector() {
    const { showCreateSrcCode } = useSnapshot(debugSettings.debugOnly);

    // const time = performance.now();
    // const timeStr = time.toLocaleString('en-US', timeFormat);
    // console.log('ContentEditorSelector render', { time: timeStr }); // {time: '725,065.2'}
    // console.log('ContentEditorSelector render', { time: timeSince() });

    printPrecitionTime('ContentEditorSelector render');

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
