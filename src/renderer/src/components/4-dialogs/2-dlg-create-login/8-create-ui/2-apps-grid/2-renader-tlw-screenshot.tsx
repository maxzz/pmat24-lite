import { type ComponentProps } from "react";
import { type TlwScreenshot } from "@shared/ipc-types";
import { IconBrokenImage } from "@/ui/icons";

export function RenaderTlwScreenshot({ item, idx }: { item: TlwScreenshot; idx: number; }) {
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

    const res = (
        <div className="pb-4 flex flex-col gap-1" key={idx}>
            <RenderData64 className="max-w-52" data64={item.data} />
            <div className="text-xs font-semibold">{item.caption}</div>
        </div>
    );
    return res;
}

function RenderData64({ data64, ...rest }: { data64: string; } & ComponentProps<'img'>): JSX.Element {

    const dataUrl = `data:image/png;base64,${data64}`;
    // console.log('RenderData64');
    return (
        <img src={dataUrl} {...rest} />
    );
}
