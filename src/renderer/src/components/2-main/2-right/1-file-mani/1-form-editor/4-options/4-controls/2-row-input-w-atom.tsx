import { InputHTMLAttributes, useState } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames } from '@/utils';
import { Popover, PopoverArrorWoBottom, PopoverContent, PopoverTrigger, inputRingClasses } from '@/ui';

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
        <Popover open={openTooltip} onOpenChange={setOpenTooltip}>
            <PopoverTrigger asChild>
                <input
                    className={classNames(rowInputClasses, inputRingClasses, className)}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onClick={() => setOpenTooltip(v => !v)}
                    {...rest}
                />
            </PopoverTrigger>

            <PopoverContent className="px-4 py-2 w-auto max-w-64 text-xs border-popover-foreground text-red-500" sideOffset={-12} align="center" arrowPadding={20}>
                This field cannot be empty <br />
                This field cannot be empty <br />
                This field cannot be empty <br />
                This field cannot be empty
                This field cannot be empty
                This field cannot be empty

                <PopoverArrorWoBottom />
            </PopoverContent>

        </Popover>
    );
}
