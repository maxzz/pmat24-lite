import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { Column3_Label } from "../../../1-normal/1-fields/3-column-label";
import { InputLabel } from "./1-input-label";

export function ManualFieldType({ item }: { item: ManualFieldState.FldForAtoms; }) {

    const { useItAtom, labelAtom, typeAtom } = item.field;

    return (
        <Column3_Label
            useItAtom={useItAtom}
            // valueAtom={typeAtom}
            valueAtom={labelAtom}
        />
    );
}
