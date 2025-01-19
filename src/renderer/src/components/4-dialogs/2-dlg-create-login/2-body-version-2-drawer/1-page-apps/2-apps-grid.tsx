import { type ComponentProps } from "react";
import reply from "@/assets/tests/25.01.16.25/TopLevelWindowsScreenshots.json";
import { GetTlwScreenshotsResult } from "@shared/ipc-types";
import { classNames } from "@/utils";
import { IconBrokenImage } from "@/ui/icons";

// console.log("AppsGrid", reply);

export function AppsGrid({ className, ...rest }: ComponentProps<"div">) {
    const data = reply as GetTlwScreenshotsResult;
    return (
        <div className={classNames("grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))] 1debug", className)} {...rest}>

            {data.map(
                (item, idx) => {
                    if (item.type === 'error') {
                        // const res = null;
                        const res = (
                            <div className="pb-4 flex flex-col gap-1" key={idx}>
                                <IconBrokenImage className="max-w-8" title="Broken image" />
                                <div className="">Error. hwnd: {item.hwnd}, error code: "{item.errorCode}"</div>
                            </div>
                        );
                        return res;
                    }

                    // const Img = data64ToImage(item.data);
                    const dataUrl = `data:image/png;base64,${item.data}`;
                    const res = (
                        <div className="pb-4 flex flex-col gap-1" key={idx}>

                            {/* <img className="w-full h-full" src={img} /> */}
                            {/* <Img className="w-full h-full" /> */}
                            {/* {Img} */}
                            <img className="max-w-52" src={dataUrl} />
                            <div className="text-xs font-semibold">{item.caption}</div>
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
