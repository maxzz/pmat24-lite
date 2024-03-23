import { Fragment } from "react";
import { FileUs } from "@/store/store-types";
import { isAnyWhy } from "@/store/store-utils";
import { SymbolDot } from "@ui/icons";
import { classNames } from "@/utils";
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui";

export function CardTitleFileIndex({ idx, errors }: { idx: number; errors?: boolean; }) {
    return (
        <div
            className={classNames(
                "p-0.5 pb-[3px] w-5 h-5 text-[.6rem] border border-dotted rounded-md flex items-center justify-center select-none cursor-default",
                errors ? "text-red-400 bg-red-900/70 border-red-500/50" : "text-primary-500 border-primary-600",
            )}
            title={errors ? undefined : "File index in the list of all loaded files"}
            onClick={(e) => errors && e.stopPropagation()}
        >
            {idx}
        </div>
    );
}

function TooltipBody({ fileUs, fileIndex }: { fileUs: FileUs; fileIndex: number; }) {
    const bailOuts = [fileUs.meta?.[0]?.disp.bailOut, fileUs.meta?.[1]?.disp.bailOut];
    return (
        <div className="pb-2 max-w-[17rem] text-sm bg-primary-100 rounded-[2px]">

            <div className="px-3 py-4 bg-red-700 text-primary-100 rounded-sm rounded-b-none">
                <div className="">There are problems in the file with index {fileIndex} to check why:</div>
            </div>

            {bailOuts.map((bailOut, idx) => (
                <Fragment key={`bailout${idx}`}>
                    {bailOut &&
                        <div className="px-3 py-1">
                            <div className="font-bold">
                                {idx === 0 ? 'Login:' : 'Password change:'}
                            </div>

                            {bailOut.map((item, key) => (
                                <div className="flex items-center" key={key}>
                                    <SymbolDot className="ml-1 w-4 h-4 flex-none self-start mt-0.5" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    }
                </Fragment>
            ))}
        </div>
    );
}

// export function TooltipDemo() {
//     return (
//         <TooltipProvider>
//             <Tooltip>
//                 <TooltipTrigger asChild>
//                     <Button variant="outline">Hover</Button>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                     <p>Add to library</p>
//                 </TooltipContent>
//             </Tooltip>
//         </TooltipProvider>
//     );
// }

export function CardTitleAttention({ fileUs }: { fileUs: FileUs; }) {
    const hasBailOut = isAnyWhy(fileUs);
    const fileIndex = fileUs.idx + 1;
    if (!hasBailOut) {
        // return <CardTitleFileIndex idx={fileIndex} />;
        return <div className="">11</div>
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {/*
                    popperOptions={{ delayShow: 300 }} // , visible: true
                    className="!p-0 !bg-primary-100 !border-primary-100"
                    */}
                    {/* <CardTitleFileIndex idx={fileIndex} errors={true} /> */}
                    <div className="">33</div>
                </TooltipTrigger>

                <TooltipContent>
                    {/* <TooltipBody fileUs={fileUs} fileIndex={fileIndex} /> */}
                    <div className="">22</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

// export function CardTitleAttention({ fileUs }: { fileUs: FileUs; }) {
//     const hasBailOut = isAnyWhy(fileUs);
//     const fileIndex = fileUs.idx + 1;
//     if (!hasBailOut) {
//         return <CardTitleFileIndex idx={fileIndex} />;
//     }
//     const bailOuts = [fileUs.meta?.[0]?.disp.bailOut, fileUs.meta?.[1]?.disp.bailOut];
//     return (
//         <UiTip
//             trigger={
//                 <CardTitleFileIndex idx={fileIndex} errors={true} />
//             }
//             popperOptions={{ delayShow: 300 }} // , visible: true
//             className="!p-0 !bg-primary-100 !border-primary-100"
//         >
//             <TooltipBody fileUs={fileUs} fileIndex={fileIndex} />
//         </UiTip>
//     );
// }
