import { ButtonHTMLAttributes } from "react";
import { PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { closeFldCatDialogAtom } from "@/store";
import { BottomButton } from "@/components/2-main/2-right/2-file-manifest/3-tab-policy/dlg-policy-editor/3-sections";

type SelectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
};

export function SelectButton({ selectedItemAtom, ...rest }: SelectButtonProps) {
    const closeFldCatDialog = useSetAtom(closeFldCatDialogAtom);
    const selectedItem = useAtomValue(selectedItemAtom);
    return (
        <BottomButton disabled={!selectedItem} onClick={() => closeFldCatDialog({ fldCatItem: selectedItem })} {...rest}>
            Select
        </BottomButton>
    );
}
