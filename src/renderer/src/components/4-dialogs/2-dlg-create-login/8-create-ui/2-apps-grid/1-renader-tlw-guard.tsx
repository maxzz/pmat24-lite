import { type ComponentProps } from "react";
import { type TlwScreenshotInfo } from "@/store";
import { type TlwError } from "@shared/ipc-types";
import { IconBrokenImage } from "@/ui/icons";
import { RenderTwlData } from "./2-renader-tlw-data";

export function RenaderTlwScreenshot({ item, idx }: { item: TlwScreenshotInfo; idx: number; }) {
    return (<>
        {item.item.type === 'error'
            ? <RenderTwlError item={item.item} key={idx} />
            : <RenderTwlData item={item.item} key={idx} />
        }
    </>);
}

function RenderTwlError({ item, ...rest }: { item: TlwError; } & ComponentProps<'div'>) {
    // const res = null;
    const res = (
        <div className="pb-4 flex flex-col gap-1" {...rest}>
            <IconBrokenImage className="max-w-8" title="Broken image" />
            <div className="">Error. hwnd: {item.hwnd}, error code: "{item.errorCode}"</div>
        </div>
    );
    return res;
}
