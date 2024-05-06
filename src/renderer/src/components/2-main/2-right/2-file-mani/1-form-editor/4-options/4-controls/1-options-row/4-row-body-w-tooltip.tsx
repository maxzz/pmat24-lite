import { InputHTMLAttributes, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from '@/ui';
import { RowInputStateAtom } from './9-types';
import { OptionInput } from './5-option-input';
import { RowTrigger } from './3-row-trigger';

type InputBodyProps = InputHTMLAttributes<HTMLInputElement> & {
    stateAtom: RowInputStateAtom;
};

export function InputBody({ stateAtom, ...rest }: InputBodyProps) {
    const [openTooltip, setOpenTooltip] = useState(false);

    const state = useAtomValue(stateAtom);

    return (
        <TooltipProvider>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>

                <div className="relative">
                    <OptionInput stateAtom={stateAtom} {...rest} />

                    <TooltipTrigger asChild>
                        <div>
                            <RowTrigger error={state.error} />
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
