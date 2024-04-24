import { InputHTMLAttributes, useEffect, useState } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames } from '@/utils';
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger, inputRingClasses } from '@/ui';
import { SymbolWarning } from '@/ui/icons';

const rowInputClasses = "\
px-2 py-1 h-6 w-full \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-none";

function validateError(value: string) {
    return value === '111' ? '' : `Value ${value} is invalid, should be 111`;
}

export function RowInputWAtom({ valueAtom, className, ...rest }: { valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useAtom(valueAtom);
    const [openTooltip, setOpenTooltip] = useState(false);

    const [touched, setTouched] = useState(false);
    const [error, setError] = useState('');

    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                <div className="relative">
                    <input
                        className={classNames(rowInputClasses, inputRingClasses, error && "!ring-1 ring-red-500", className)}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            const errorMsg = validateError?.(e.target.value) ?? '';
                            setError(errorMsg);
                        }}
                        onBlur={() => {
                            setTouched(true);
                            const errorMsg = validateError?.(value) ?? '';
                            setError(errorMsg);
                        }}
                        {...rest}
                    />
                    <TooltipTrigger asChild>
                        <div>
                            {error && (
                                <SymbolWarning className="absolute mt-px right-3 top-1/2 transform -translate-y-1/2 size-4 text-red-500" />
                            )}
                        </div>
                    </TooltipTrigger>
                </div>

                {error && (
                    <TooltipPortal container={document.getElementById("portal")}>
                        <TooltipContent align="end" sideOffset={-2}>
                            {error}
                        </TooltipContent>
                    </TooltipPortal>
                )}

            </Tooltip>
        </TooltipProvider>
    );
}
