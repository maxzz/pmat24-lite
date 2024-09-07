import { type PrimitiveAtom } from "jotai";
import { type RowInputState } from "@/ui";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { InputWTooltip } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";

export function InputDelay({ valueAtom }: { valueAtom: PrimitiveAtom<RowInputState>; }) {
    return (
        <label className="flex flex-col gap-1">
            <span>
                Delay the next action by
            </span>

            <div className="max-w-24 flex items-center gap-1" title="Delay in millisecond before performing the next action">
                <InputWTooltip stateAtom={valueAtom} asCheckbox={false} />

                <span>
                    ms
                </span>
            </div>
        </label>
    );
}

export function PropsEditorDly({ item }: { item: ManualFieldState.DlyForAtoms; }) {
    return (<>
        <InputDelay valueAtom={item.nAtom} />
    </>);
}
