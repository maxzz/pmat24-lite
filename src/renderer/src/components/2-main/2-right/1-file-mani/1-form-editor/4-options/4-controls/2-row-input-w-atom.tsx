import { InputHTMLAttributes, useEffect, useState } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames } from '@/utils';
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger, inputRingClasses } from '@/ui';

const rowInputClasses = "\
px-2 py-1 h-6 \
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

    useEffect(() => {
        console.log('useEffect value', value);
    }, [value]);
    
    console.log('Tooltip is open', openTooltip, 'value', value);
    
    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
                <TooltipTrigger asChild>
                    <input
                        className={classNames(rowInputClasses, inputRingClasses, !valid && "!ring-1 ring-red-500", className)}
                        value={value}
                        onChange={(e) => {
                            const isValid = validateValue(e.target.value);
                            setOpenTooltip(isValid);
                            setValid(isValid);
                            setValue(e.target.value);
                        }}
                        onBlur={() => {
                            setTouched(true);
                            const isValid = validateValue(value);
                            setOpenTooltip(!isValid);
                            setValid(isValid);
                        }}
                        // onClick={() => setOpenTooltip(v => !v)}
                        {...rest}
                    />
                </TooltipTrigger>

                {!valid && (
                    <TooltipPortal>
                        <TooltipContent align="start">
                            Value is {value} and it is {valid ? 'valid' : 'invalid'}
                        </TooltipContent>
                    </TooltipPortal>
                )}

            </Tooltip>
        </TooltipProvider>
    );
}
