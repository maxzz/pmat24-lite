import type { TlwData } from "@shared/ipc-types";
import type { ComponentProps } from "react";

export function RenderTwlData({ item, ...rest }: { item: TlwData; } & ComponentProps<'div'>) {
    const res = (
        <div className="pb-4 flex flex-col gap-1" {...rest}>
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
