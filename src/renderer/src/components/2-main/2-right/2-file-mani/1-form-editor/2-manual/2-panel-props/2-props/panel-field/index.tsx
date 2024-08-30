import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWLabel } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls";
import { SrcriptItemFld } from "@/store";
import { propsBoxClasses, InputField } from "../../ui";

export function PropsEditorFld({ item, ...rest }: { item: SrcriptItemFld; } & HTMLAttributes<HTMLElement>) {
    const snap = useSnapshot(item, { sync: true });
    return (
        <div className={propsBoxClasses} {...rest}>
            <InputField label="Field label" value={`${snap.id}`} onChange={(e) => item.id = e.target.value} />
            <InputField label="Type" />
            <InputField label="Reference" />
            <InputField label="Value" />
        </div>
    );
}
