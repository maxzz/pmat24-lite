import { HTMLAttributes } from "react";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWLabel } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";
import { propsBoxClasses } from "../../8-ui";
// import { SrcriptItemFld } from "@/store";

export function PropsEditorFld({ item, ...rest }: { item: ManualFieldState.FldForAtoms; } & HTMLAttributes<HTMLElement>) {
    const { field } = item;
    return (
        <div className={propsBoxClasses} {...rest}>
            {/* <RowInputWLabel stateAtom={item.} label="Field id" />

            <InputField label="Field label" value={`${snap.id}`} onChange={(e) => item.id = e.target.value} />
            <InputField label="Type" />
            <InputField label="Reference" />
            <InputField label="Value" /> */}
        </div>
    );
}
