import { type PrimitiveAtom } from "jotai";
import { type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { type RowInputState, InputOrCheckWithTooltip } from "@/ui/local-ui";

export function InputDelay({ valueAtom }: { valueAtom: PrimitiveAtom<RowInputState>; }) {
    return (
        <label className="flex flex-col gap-0.5">
            <span>
                Delay the next action by
            </span>

            <div className="max-w-24 flex items-center gap-1" title="Delay in millisecond before performing the next action">
                <InputOrCheckWithTooltip stateAtom={valueAtom} asCheckbox={false} />

                <span>
                    ms
                </span>
            </div>
        </label>
    );
}

export function PropsEditorDly({ item }: { item: ManualFieldState.CtxDly; }) {
    return (
        <InputDelay valueAtom={item.nAtom} />
    );
}
