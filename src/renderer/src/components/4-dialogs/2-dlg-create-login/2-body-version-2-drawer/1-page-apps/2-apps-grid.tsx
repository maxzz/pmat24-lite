import { type ComponentProps } from "react";
import reply from "@/assets/tests/25.01.16.25/TopLevelWindowsScreenshots.json";
import { GetTlwScreenshotsResult } from "@shared/ipc-types";
import { classNames } from "@/utils";

// console.log("AppsGrid", reply);

export function AppsGrid({ className, ...rest }: ComponentProps<"div">) {
    const data = reply as GetTlwScreenshotsResult;
    return (
        <div className={classNames("1grid gap-12 debug", className)} {...rest}>

            {data.map(
                (item, idx) => {
                    if (item.type === 'error') {
                        const res = null;
                        // const res = (
                        //     <div className="flex flex-col gap-1" key={idx}>
                        //         Error. hwnd: {item.hwnd}, error code: "{item.errorCode}"
                        //     </div>
                        // );
                        return res;
                    }

                    // const Img = data64ToImage(item.data);
                    const dataUrl = `data:image/png;base64,${item.data}`;
                    const res = (
                        <div className="flex flex-col gap-1" key={idx}>
                            <div className="text-xs font-semibold">{item.caption}</div>
                            <div className="1relative">
                                {/* <img className="w-full h-full" src={img} /> */}
                                {/* <Img className="w-full h-full" /> */}
                                {/* {Img} */}
                                <img className="1w-12 1h-12" src={dataUrl} />
                            </div>
                        </div>
                    );
                    return res;

                    // return (
                    //     <div className="flex flex-col gap-1" key={idx}>
                    //         <div className="text-xs font-semibold">{item.caption}</div>
                    //         <div className="text-xs">{item.caption}</div>
                    //     </div>
                    // );
                }
            )}

        </div>
    );
}

function data64ToImage(data64: string): HTMLImageElement {
    const img = new Image();
    const dataUrl = `data:image/png;base64,${data64}`;
    img.src = dataUrl;
    return img;
}
