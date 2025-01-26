import { type ComponentProps } from "react";
import { type TlwScreenshotInfo } from "@/store";
import { type TlwError } from "@shared/ipc-types";
import { IconBrokenImage } from "@/ui/icons";
import { TwlRenderImage } from "./2-tlw-render-image";

export function TlwRendererSelector({ item, idx }: { item: TlwScreenshotInfo; idx: number; }) {
    return (<>
        {item.item.type === 'error'
            ? <RenderTwlError info={item.item} key={item.uuid} />
            : <TwlRenderImage info={item} idx={idx} key={item.uuid} />
        }
    </>);
}

function RenderTwlError({ info, ...rest }: { info: TlwError; } & ComponentProps<'div'>) {
    // const res = null;
    const res = (
        <div className="pb-4 flex flex-col gap-1" {...rest}>
            <IconBrokenImage className="max-w-8" title="Broken image" />

            <div>
                Error. hwnd: {info.hwnd}, error code: "{info.errorCode}"
            </div>
        </div>
    );
    return res;
}
