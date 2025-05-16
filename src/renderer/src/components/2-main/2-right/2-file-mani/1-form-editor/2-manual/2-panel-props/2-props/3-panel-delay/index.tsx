import { type PrimitiveAtom } from "jotai";
import { type RowInputState } from "@/ui";
import { type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputOrCheckWithTooltip } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";

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
