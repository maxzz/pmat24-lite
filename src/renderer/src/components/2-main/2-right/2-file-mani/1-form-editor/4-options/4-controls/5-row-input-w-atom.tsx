import { InputHTMLAttributes, useEffect, useState } from 'react';
import { PrimitiveAtom, atom, useAtom } from 'jotai';
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

type RowInputState<Value> = {
    data: Value;
    error?: string;
    touched?: boolean;
    validate?: (value: Value) => string | undefined;
    fromString?: (value: string) => Value;
};

type RowInputStateAtom = PrimitiveAtom<RowInputState<string>>

type RowInputProps = InputHTMLAttributes<HTMLInputElement> & {
    stateAtom: RowInputStateAtom;
};

function RawInput({ stateAtom, className, ...rest }: RowInputProps) {
    const [value, setValue] = useAtom(stateAtom);
    return (
        <input
            className={classNames(rowInputClasses, inputRingClasses/*, error && "ring-1 ring-red-500/70"*/, className)}
            value={value.data}
            onChange={(e) => {
                setValue((v) => ({ ...v, data: e.target.value }));
                const errorMsg = validateError?.(e.target.value) ?? '';
                setValue((v) => ({ ...v, error: errorMsg }));
            }}
            onBlur={() => {
                setValue((v) => ({ ...v, touched: true }));
                const errorMsg = validateError?.(value.data) ?? '';
                setValue((v) => ({ ...v, error: errorMsg }));
            }}
            {...rest}
        />
    );
}

export function RowInputWAtom({ valueAtom, className, ...rest }: RowInputWAtomProps) {
    const [value, setValue] = useAtom(valueAtom);
    const [openTooltip, setOpenTooltip] = useState(false);

    const [touched, setTouched] = useState(false);
    const [error, setError] = useState('');

    const stateAtom = useState(() => atom<RowInputState<string>>({ data: value, error, touched, validate: validateError }))[0];

    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                <div className="relative">
                    <RawInput stateAtom={stateAtom} className={className} {...rest} />

                    {/* <input
                        className={classNames(rowInputClasses, inputRingClasses/*, error && "ring-1 ring-red-500/70"* /, className)}
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
                    /> */}

                    <TooltipTrigger asChild>
                        <div>
                            {error && (
                                <SymbolWarning className="absolute mt-px mr-px right-3 top-1/2 transform -translate-y-1/2 size-4 text-red-500/90" />
                            )}
                        </div>
                    </TooltipTrigger>
                </div>

                {error && touched && (
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




function validateError(value: string) {
    return value === '111' ? '' : `Value ${value} is invalid, should be 111`;
}

type RowInputWAtomProps = InputHTMLAttributes<HTMLInputElement> & {
    valueAtom: PrimitiveAtom<string>;
};

export function RowInputWAtom_Old({ valueAtom, className, ...rest }: RowInputWAtomProps) {
    const [value, setValue] = useAtom(valueAtom);
    const [openTooltip, setOpenTooltip] = useState(false);

    const [touched, setTouched] = useState(false);
    const [error, setError] = useState('');

    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                <div className="relative">
                    <input
                        className={classNames(rowInputClasses, inputRingClasses/*, error && "ring-1 ring-red-500/70"*/, className)}
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
                                <SymbolWarning className="absolute mt-px mr-px right-3 top-1/2 transform -translate-y-1/2 size-4 text-red-500/90" />
                            )}
                        </div>
                    </TooltipTrigger>
                </div>

                {error && touched && (
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
