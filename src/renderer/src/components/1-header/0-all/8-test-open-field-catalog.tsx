import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenFieldCatalogDialogAtom } from "@/store/atoms/7-dialogs";

export function TestOpenFieldCatalog() {
    const doOpenFieldCatalogDialog = useSetAtom(doOpenFieldCatalogDialogAtom);
    return (
        <Button onClick={() => doOpenFieldCatalogDialog(true)}>
            Field Catalog
        </Button>
    );
}
