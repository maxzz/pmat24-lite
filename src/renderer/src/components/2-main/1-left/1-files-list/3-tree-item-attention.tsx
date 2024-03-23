import { Fragment } from "react";
import { FileUs } from "@/store/store-types";
import { isAnyWhy } from "@/store/store-utils";
import { SymbolDot } from "@ui/icons";
import { classNames } from "@/utils";
import { Button, Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/ui";
import { TooltipArrow } from "@radix-ui/react-tooltip";

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
    return (<div className="px-3 py-1.5">

        <div className="border-border border">There are problems in the file with index {fileIndex} to check why:</div>

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
                                <div className="">
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </Fragment>
        ))}
    </div>);
}

export function CardTitleAttention({ fileUs }: { fileUs: FileUs; }) {
    const hasBailOut = isAnyWhy(fileUs);
    const fileIndex = fileUs.idx + 1;
    if (!hasBailOut) {
        return <CardTitleFileIndex idx={fileIndex} />;
    }
    return (
        <TooltipProvider>
            <Tooltip /**/ open={true}/**/>
                <TooltipTrigger asChild>
                    <div>
                        <CardTitleFileIndex idx={fileIndex} errors={true} />
                    </div>
                </TooltipTrigger>

                <TooltipPortal>
                    <TooltipContent className="p-0 max-w-72 text-xs border-border border shadow">
                        <TooltipBody fileUs={fileUs} fileIndex={fileIndex} />
                        <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
        </TooltipProvider>
    );
}
