import { type ComponentProps } from "react";
import { useSnapshot } from "valtio";
import { TlwScreenshotInfo } from "@/store";
import type { TlwData } from "@shared/ipc-types";

export function RenderTwlData({ item, ...rest }: { item: TlwScreenshotInfo; } & ComponentProps<'div'>) {
    const isSelected = useSnapshot(item.editor).selected;
    const tlwData = item.item as TlwData;
    return (
        <div className="pb-4 flex flex-col gap-1" {...rest}>
            <RenderData64 className="max-w-52" data64={tlwData.data} />
            <div className="text-xs font-semibold">{tlwData.caption}</div>
        </div>
    );
}

function RenderData64({ data64, ...rest }: { data64: string; } & ComponentProps<'img'>): JSX.Element {
    // console.log('RenderData64');
    return (
        <img src={data64} {...rest} />
    );
}
