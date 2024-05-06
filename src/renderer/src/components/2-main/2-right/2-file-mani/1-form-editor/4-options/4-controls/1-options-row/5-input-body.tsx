import { InputHTMLAttributes, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from '@/ui';
import { RowInputStateAtom } from './9-types';
import { RawInput } from './2-raw-input';
import { InputTrigger } from './4-input-trigger';

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
