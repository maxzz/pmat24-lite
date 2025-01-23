import { type ComponentProps } from "react";
import { useSnapshot } from "valtio";
import { type TlwScreenshotInfo } from "@/store";
import { type TlwData } from "@shared/ipc-types";
import { CheckIcon } from "lucide-react";
import { classNames } from "@/utils";

export function RenderTwlData({ item, ...rest }: { item: TlwScreenshotInfo; } & ComponentProps<'div'>) {
    const isSelected = useSnapshot(item.editor).selected;
    const tlwData = item.item as TlwData;
    return (
        <div
            className={classNames("relative m-1 pb-4 flex flex-col gap-1 overflow-hidden")}
            onClick={() => item.editor.selected = !isSelected}
            {...rest}
        >
            <RenderData64 className={classNames("m-1 max-w-52", isSelected && itemSelectedClasses)} data64={tlwData.data} />

            {isSelected
                ? <CheckIcon className={checkboxClasses} />
                : null
            }

            <div className="text-xs font-semibold">{tlwData.caption}</div>
        </div>
    );
}

// const itemSelectedClasses = "outline outline-2 -outline-offset-2 outline-sky-500 outline-o rounded";
const itemSelectedClasses = "ring-2 ring-sky-500 1ring-offset-1 ring-o rounded";

const checkboxClasses = "\
absolute left-2 top-1.5 p-1 size-6 \
text-black bg-white border-2 border-sky-500 \
shadow-sm shadow-slate-500 \
rounded-full";

function RenderData64({ data64, ...rest }: { data64: string; } & ComponentProps<'img'>): JSX.Element {
    // console.log('RenderData64');
    return (
        <img src={data64} {...rest} />
    );
}
