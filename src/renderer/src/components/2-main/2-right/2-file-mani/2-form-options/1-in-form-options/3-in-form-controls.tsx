import { type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type OptionInputWTypeProps, OptionAsCheckbox, OptionAsString } from "@/ui/local-ui";

export function InFormRowInputWTitle({ label, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <InFormChildrenWithLabel label={label}>
            <InputOrCheckWithErrorMsg {...rest} />
        </InFormChildrenWithLabel>
    );
}

function InFormChildrenWithLabel({ label, children }: { label: string; children: ReactNode; }) {
    return (
        <div className="col-span-2 py-1 pr-0.5 text-xs grid grid-cols-subgrid items-center">
            <div className="font-light">
                {label}
            </div>

            {children}
        </div>
    );
}

function InputOrCheckWithErrorMsg({ stateAtom, asCheckbox, ...rest }: OptionInputWTypeProps) {
    const state = useAtomValue(stateAtom);
    const hasError = state.error && state.touched;
    return (<>
        <div className="">

            {asCheckbox
                ? <OptionAsCheckbox stateAtom={stateAtom} {...rest} />
                : <OptionAsString stateAtom={stateAtom} {...rest} />
            }

            {hasError && (
                <div className="text-[0.65rem] text-red-500">
                    {state.error}
                </div>
            )}

        </div>
    </>);
}
