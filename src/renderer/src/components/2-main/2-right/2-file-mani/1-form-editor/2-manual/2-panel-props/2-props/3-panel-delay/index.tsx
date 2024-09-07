import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWLabel } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";
import { InputWTooltip } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";

export function InputDelay({ item }: { item: ManualFieldState.DlyForAtoms; }) {
    return (
        <div title="Delay in ms before performing the next action">

            <label className="flex flex-col gap-1">
                <span className="text-nowrap">
                    Delay the next action by
                </span>

                <div className="max-w-24 flex items-center gap-1">
                    <InputWTooltip stateAtom={item.nAtom} asCheckbox={false} />

                    <div className="1pb-1.5">
                        ms
                    </div>
                </div>
            </label>

            {/* <RowInputWLabel stateAtom={item.nAtom} label="Delay the next action by" type="number" min={0} max={99999} step={1} /> */}

        </div>
    );
}

export function PropsEditorDly({ item }: { item: ManualFieldState.DlyForAtoms; }) {
    return (<>
        <InputDelay item={item} />
    </>);
}
