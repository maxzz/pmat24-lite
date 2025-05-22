import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type OptionInputWTypeProps } from "./9-types";
import { InputOrCheckWithErrorMsg } from "./1-in-form-controls";

export function InputOrCheckWithTooltip({ stateAtom, /*asCheckbox, asTextarea, className,*/ containerClasses, ...rest }: OptionInputWTypeProps) {
    const state = useAtomValue(stateAtom);
    return (
        <div className={classNames("relative w-full", containerClasses)}>
            <InputOrCheckWithErrorMsg stateAtom={stateAtom} {...rest} />
        </div>
    );
}
