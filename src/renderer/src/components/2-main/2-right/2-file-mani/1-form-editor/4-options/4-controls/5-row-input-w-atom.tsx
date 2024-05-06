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

function RawInput({ stateAtom, className, ...rest }: InputHTMLAttributes<HTMLInputElement> & { stateAtom: RowInputStateAtom; }) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState((v) => ({ ...v, data: e.target.value }));
        setState((v) => ({ ...v, error: state.validate?.(e.target.value) }));
    }

    function onBlur() {
        setState((v) => ({ ...v, touched: true }));
        setState((v) => ({ ...v, error: state.validate?.(state.data) }));
    }

    return (
        <input
            className={classNames(rowInputClasses, inputRingClasses/*, vakue.error && "ring-1 ring-red-500/70"*/, className)}
            value={state.data}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
        />
    );
}

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

function InputTrigger({ error }: { error: string | undefined; }) {
    return (<>
        {error && (
            <SymbolWarning className="absolute mt-px mr-px right-3 top-1/2 transform -translate-y-1/2 size-4 text-red-500/90" />
        )}
    </>);
}

export function InputBody({ stateAtom, ...rest }: InputHTMLAttributes<HTMLInputElement> & { stateAtom: RowInputStateAtom; }) {
    const [openTooltip, setOpenTooltip] = useState(false);

    const state = useAtomValue(stateAtom);

    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                <div className="relative">
                    <RawInput stateAtom={stateAtom} {...rest} />

                    <TooltipTrigger asChild>
                        <div>
                            <InputTrigger error={state.error} />
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
    );
}

type RowInputWAtomProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
};

export function RowInputWAtom({ label, ...rest }: RowInputWAtomProps) {
    return (
        <InputLabel label={label}>
            <InputBody {...rest} />
        </InputLabel>
    );
}
