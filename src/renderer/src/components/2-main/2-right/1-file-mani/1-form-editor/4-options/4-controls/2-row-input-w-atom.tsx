import { InputHTMLAttributes, useState } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames } from '@/utils';
import { Label, Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger, inputRingClasses } from '@/ui';

const rowInputClasses = "\
px-2 py-1 h-6 \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-none";

export function RowInputWAtom({ valueAtom, className, ...rest }: { valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useAtom(valueAtom);
    const [openTooltip, setOpenTooltip] = useState(false);
    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
                {/* <TooltipTrigger asChild>
                </TooltipTrigger> */}

                <input
                    className={classNames(rowInputClasses, inputRingClasses, className)}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onClick={() => setOpenTooltip(v => !v)}
                    {...rest}
                />

                <TooltipPortal>
                    <TooltipContent>
                        1111111
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
        </TooltipProvider>
    );
}
