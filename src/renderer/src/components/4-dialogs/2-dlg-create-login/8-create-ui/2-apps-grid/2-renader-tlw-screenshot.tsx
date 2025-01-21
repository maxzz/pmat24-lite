import { type ComponentProps } from "react";
import { type TlwScreenshotInfo } from "@/store";
import { IconBrokenImage } from "@/ui/icons";

export function RenaderTlwScreenshot({ item, idx }: { item: TlwScreenshotInfo; idx: number; }) {
    if (item.item.type === 'error') {
        // const res = null;
        const res = (
            <div className="pb-4 flex flex-col gap-1" key={idx}>
                <IconBrokenImage className="max-w-8" title="Broken image" />
                <div className="">Error. hwnd: {item.item.hwnd}, error code: "{item.item.errorCode}"</div>
            </div>
        );
        return res;
    }

    const res = (
        <div className="pb-4 flex flex-col gap-1" key={idx}>
            <RenderData64 className="max-w-52" data64={item.item.data} />
            <div className="text-xs font-semibold">{item.item.caption}</div>
        </div>
    );
    return res;
}

function RenderData64({ data64, ...rest }: { data64: string; } & ComponentProps<'img'>): JSX.Element {
    // console.log('RenderData64');
    return (
        <img src={data64} {...rest} />
    );
}
