import { ButtonHTMLAttributes } from "react";
import { PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui/shadcn";
import { CatalogItem } from "@/store/manifest";
import { doCloseFldCatDialogAtom } from "@/store";


type SelectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
};

export function SelectButton({ selectedItemAtom, ...rest }: SelectButtonProps) {
    const closeFldCatDialog = useSetAtom(doCloseFldCatDialogAtom);
    const selectedItem = useAtomValue(selectedItemAtom);
    return (
        <Button disabled={!selectedItem} onClick={() => closeFldCatDialog({ fldCatItem: selectedItem })} {...rest}>
            Select
        </Button>
    );
}
