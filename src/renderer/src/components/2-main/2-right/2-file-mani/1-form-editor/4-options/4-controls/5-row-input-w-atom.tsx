import { InputHTMLAttributes, useState } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { classNames } from '@/utils';
import { Label, Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger, inputRingClasses } from '@/ui';
import { SymbolWarning } from '@/ui/icons';

export type RowInputState = {
    data: string;
    dirty: boolean;
    error: string | undefined;
    touched: boolean | undefined;
    validate?: (value: string) => string | undefined;
};

export type RowInputStateAtom = PrimitiveAtom<RowInputState>;

const rowInputClasses = "\
px-2 py-1 h-6 w-full \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-none";

type RowInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
};

function RawInput({ label, stateAtom, className, ...rest }: RowInputProps) {
    const [value, setValue] = useAtom(stateAtom);
    return (
        <input
            className={classNames(rowInputClasses, inputRingClasses/*, error && "ring-1 ring-red-500/70"*/, className)}
            value={value.data}
            onChange={(e) => {
                setValue((v) => ({ ...v, data: e.target.value }));
                const errorMsg = value.validate?.(e.target.value) ?? '';
                setValue((v) => ({ ...v, error: errorMsg }));
            }}
            onBlur={() => {
                setValue((v) => ({ ...v, touched: true }));
                const errorMsg = value.validate?.(value.data) ?? '';
                setValue((v) => ({ ...v, error: errorMsg }));
            }}
            {...rest}
        />
    );
}

type RowInputWAtomProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
};

export function InputLabel({ label, children, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string; }) {
    return (
        <Label className="grid grid-cols-subgrid col-span-2 items-center text-xs font-light">
            <div>
                {label}
            </div>
            {children}
        </Label>
    );
}

export function RowInputWAtom({ label, stateAtom, className, ...rest }: RowInputWAtomProps) {
    const [openTooltip, setOpenTooltip] = useState(false);

    const state = useAtomValue(stateAtom);

    return (
        <InputLabel label={label}>
            <TooltipProvider>
                <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                    <div className="relative">
                        <RawInput label={label} stateAtom={stateAtom} className={className} {...rest} />

                        <TooltipTrigger asChild>
                            <div>
                                {state.error && (
                                    <SymbolWarning className="absolute mt-px mr-px right-3 top-1/2 transform -translate-y-1/2 size-4 text-red-500/90" />
                                )}
                            </div>
                        </TooltipTrigger>
                    </div>

                    {state.error && state.touched && (
                        <TooltipPortal container={document.getElementById("portal")}>
                            <TooltipContent align="end" sideOffset={-2}>
                                {state.error}
                            </TooltipContent>
                        </TooltipPortal>
                    )}

                </Tooltip>
            </TooltipProvider>
        </InputLabel>
    );
}
