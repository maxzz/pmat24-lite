import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWLabel } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";

export function InputDelay({ item }: { item: ManualFieldState.DlyForAtoms; }) {
    return (
        <div className="flex items-end space-x-1" title="Delay in ms before performing the next action">
            <RowInputWLabel stateAtom={item.nAtom} label="Description" />

            <div className="pb-1">
                ms
            </div>
        </div>
    );
}

export function PropsEditorDly({ item }: { item: ManualFieldState.DlyForAtoms; }) {
    return (<>
        <InputDelay item={item} />
    </>);
}
