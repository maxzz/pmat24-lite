import { type ComponentProps } from "react";
import { useSnapshot } from "valtio";
import { type TlwScreenshotInfo } from "@/store";
import { type TlwData } from "@shared/ipc-types";
import { CheckIcon } from "lucide-react";

export function RenderTwlData({ item, ...rest }: { item: TlwScreenshotInfo; } & ComponentProps<'div'>) {
    const isSelected = useSnapshot(item.editor).selected;
    const tlwData = item.item as TlwData;
    return (
        <div className="relative pb-4 flex flex-col gap-1" onClick={() => item.editor.selected = !isSelected} {...rest}>
            <RenderData64 className="max-w-52" data64={tlwData.data} />
            {isSelected
                ? <CheckIcon className="absolute left-3 top-2 p-1 size-6 text-black bg-white border-2 border-black rounded-full" />
                : null
            }
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
