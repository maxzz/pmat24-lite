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

function validateValue(value: string) {
    return value === '111';
}

export function RowInputWAtom({ valueAtom, className, ...rest }: { valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useAtom(valueAtom);
    const [openTooltip, setOpenTooltip] = useState(false);

    const [touched, setTouched] = useState(false);
    const [valid, setValid] = useState(true);

    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                <div className="relative">
                    <input
                        className={classNames(rowInputClasses, inputRingClasses, !valid && "!ring-1 ring-red-500", className)}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            const isValid = validateValue?.(e.target.value) || true;
                            setValid(isValid);
                        }}
                        onBlur={() => {
                            setTouched(true);
                            const isValid = validateValue?.(value) || true;
                            setValid(isValid);
                        }}
                        {...rest}
                    />
                    <TooltipTrigger asChild>
                        <div>
                            {!valid && (
                                <SymbolWarning className="absolute mt-px right-3 top-1/2 transform -translate-y-1/2 size-4 text-red-500" />
                            )}
                        </div>
                    </TooltipTrigger>
                </div>

                {!valid && (
                    <TooltipPortal container={document.getElementById("portal")}>
                        <TooltipContent align="end" sideOffset={-2}>
                            Value is {value} and it is {valid ? 'valid' : 'invalid'}
                        </TooltipContent>
                    </TooltipPortal>
                )}

            </Tooltip>
        </TooltipProvider>
    );
}
