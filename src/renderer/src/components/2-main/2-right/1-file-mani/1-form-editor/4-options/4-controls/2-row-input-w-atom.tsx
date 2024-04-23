import { InputHTMLAttributes, useState } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames } from '@/utils';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger, inputRingClasses } from '@/ui';

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

                {/* <PopoverArrow className="fill-popover stroke-popover-foreground stroke-2" /> */}

                {/* <PopoverArrow className="fill-popover stroke-popover-foreground stroke-2" asChild>
                    <div className="w-4 h-4 bg-red-500"></div>
                </PopoverArrow> */}

                <PopoverArrow className="-mt-px stroke-popover-foreground" asChild>
                    <svg className="fill-popover 1stroke-red-500 stroke-[1.5]" width="10" height="5" viewBox="0 0 30 10" preserveAspectRatio="none">
                        {/* <polygon points="0,0 30,0 15,10"> */}
                        {/* <polygon points="0,0 15,10 30,0">
                        </polygon> */}
                        <polyline points="0,0 15,9 30,0">
                        </polyline>
                        <rect className="fill-popover stroke-none" x="0" y="0" width="30" height="1" fill="none" stroke="none" />
                    </svg>
                </PopoverArrow>
            </PopoverContent>

        </Popover>
    );
}
