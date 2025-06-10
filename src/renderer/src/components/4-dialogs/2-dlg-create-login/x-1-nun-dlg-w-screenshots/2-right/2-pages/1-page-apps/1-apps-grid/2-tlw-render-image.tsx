import { type JSX, type ComponentProps } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "motion/react";
import { type TlwScreenshotInfo } from "@/store";
import { type TlwData } from "@shared/ipc-types";
import { CheckIcon } from "lucide-react";
import { classNames } from "@/utils";
import { newManiCtx } from "../../../../0-new-mani-ctx";

const MotionIcon = motion.create(CheckIcon);

export function TwlRenderImage({ info, idx, ...rest }: { info: TlwScreenshotInfo; idx: number; } & ComponentProps<'div'>) {
    const doSetSelected = useSetAtom(newManiCtx.appSelectedIdxAtom);

    const isSelected = useSnapshot(info.editor).selected;
    const tlwData = info.item as TlwData;

    //console.log('TwlRenderImage', isSelected);
    
    return (
        <div
            className={classNames("relative m-1 pb-4 flex flex-col gap-1 overflow-hidden cursor-pointer")}
            onClick={
                () => {
                    info.editor.selected = !isSelected;
                    doSetSelected(idx);
                }
            }
            {...rest}
        >
            <RenderData64 className={classNames("m-1 max-w-52 max-h-36", isSelected && itemSelectedClasses)} data64={tlwData.data} />

            {/* {isSelected && <CheckIcon className={checkboxClasses} />} */}
            <AnimatePresence>
                {isSelected && (
                    <MotionIcon
                        className={checkboxClasses}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>

            <div className="m-1 text-xs font-semibold">{tlwData.caption}</div>
        </div>
    );
}

// const itemSelectedClasses = "outline outline-2 -outline-offset-2 outline-sky-500 outline-o rounded";
// const itemSelectedClasses = "ring-2 ring-sky-500 1ring-offset-1 ring-o rounded";

const itemSelectedClasses = "\
outline outline-2 -outline-offset-2 outline-sky-500 outline-o \
ring-1 ring-sky-500 1ring-offset-1 ring-o \
rounded-md \
1transition-all 1duration-[300ms] \
";

// const checkboxClasses = "\
// absolute left-2 top-1.5 p-1 size-6 \
// text-black bg-white border-2 border-sky-500 \
// shadow-sm shadow-slate-500 \
// rounded-full";

const checkboxClasses = "\
absolute left-3.5 top-3 p-1 size-6 \
text-black bg-white border-2 border-sky-500 \
shadow-sm shadow-slate-500 \
rounded-full";

function RenderData64({ data64, ...rest }: { data64: string; } & ComponentProps<'img'>): JSX.Element {
    // console.log('RenderData64');
    return (
        <img src={data64} {...rest} />
    );
}
