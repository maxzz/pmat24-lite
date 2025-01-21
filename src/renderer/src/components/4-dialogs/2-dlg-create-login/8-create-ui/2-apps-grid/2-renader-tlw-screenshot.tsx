import { type ComponentProps } from "react";
import { type TlwScreenshotInfo } from "@/store";
import { type TlwData, type TlwError } from "@shared/ipc-types";
import { IconBrokenImage } from "@/ui/icons";

export function RenaderTlwScreenshot({ item, idx }: { item: TlwScreenshotInfo; idx: number; }) {
    if (item.item.type === 'error') {
        return (
            <RenderTwlError item={item.item} key={idx} />
        );
    } else {
        return (
            <RenderTwlData item={item.item} key={idx} />
        );
    }
}

function RenderTwlData({ item, ...rest }: { item: TlwData; } & ComponentProps<'div'>) {
    const res = (
        <div className="pb-4 flex flex-col gap-1">
            <RenderData64 className="max-w-52" data64={item.data} />
            <div className="text-xs font-semibold">{item.caption}</div>
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
