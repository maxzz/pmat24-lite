import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenFldCatDialogAtom } from "@/store";

export function TestOpenFieldCatalog() {
    const doOpenFieldCatalogDialog = useSetAtom(doOpenFldCatDialogAtom);
    return (
        <Button className="text-[.65rem]" onClick={() => doOpenFieldCatalogDialog({ fceRoot: undefined })}>
            Field Catalog...
        </Button>
    );
}
