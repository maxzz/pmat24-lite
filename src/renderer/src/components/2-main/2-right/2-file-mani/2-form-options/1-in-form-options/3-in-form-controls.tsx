import { useState, type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { OptionAsCheckbox, OptionAsString, type RowInputStateAtom, type OptionInputWTypeProps } from "@/ui/local-ui";

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
            <div className="font-light text-end">
                {label}
            </div>

            {children}
        </div>
    );
}

function InputOrCheckWithErrorMsg({ stateAtom, asCheckbox, ...rest }: OptionInputWTypeProps) {
    const state = useAtomValue(stateAtom);
    return (<>
        <div className="">

            {asCheckbox
                ? <OptionAsCheckbox stateAtom={stateAtom} {...rest} />
                : <OptionAsString stateAtom={stateAtom} {...rest} />
            }

            {state.error && state.touched && (
                <div className="">
                    error
                    {/* <Trigger error={state.error} /> */}
                    {/* {Trigger ? <Trigger error={state.error} /> : <div className="">no trigger</div> } */}
                </div>
            )}

        </div>
    </>);
}
