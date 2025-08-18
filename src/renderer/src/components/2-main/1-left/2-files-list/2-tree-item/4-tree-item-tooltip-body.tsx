import { Fragment } from "react";
import { FileUs } from "@/store/store-types";
import { SymbolDot } from "@ui/icons";

function ProblemsList({ bailOut }: { bailOut: string[]; }) {
    return (<>
        {bailOut.map(
            (item, key) => (
                <div className="flex items-center" key={key}>
                    <SymbolDot className="flex-none self-start size-5 fill-red-500 stroke-muted stroke-[1]" />
                    {item}
                </div>
            ))
        }
    </>);
}

export function TooltipBody({ fileUs, fileIndex }: { fileUs: FileUs; fileIndex: number; }) {
    const bailOuts = [fileUs.parsedSrc.meta?.[0]?.disp.bailOut, fileUs.parsedSrc.meta?.[1]?.disp.bailOut];
    return (<div className="px-3 py-1.5">

        <div className="mb-2 pt-1 pb-1 border-border border-b border-dotted">There are problems in the file with index {fileIndex}, check why:</div>

        {bailOuts.map(
            (bailOut, idx) => (
                <Fragment key={`bailout${idx}`}>
                    {bailOut && (<>
                        <div className="font-bold">
                            {`${idx === 0 ? 'Login' : 'Password change'} form:`}
                        </div>

                        <div className="py-1">
                            <ProblemsList bailOut={bailOut} />
                        </div>
                    </>)}
                </Fragment>
            ))
        }
    </div>);
}
