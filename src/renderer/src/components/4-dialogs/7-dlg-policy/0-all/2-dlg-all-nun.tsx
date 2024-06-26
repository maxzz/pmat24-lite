import { useState } from "react";
import { Mani } from "@/store/manifest";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Button, Dialog, DialogContent, DialogTrigger } from "@/ui";
import { PolicyEditorBody } from "./3-dlg-body";

export function PolicyEditorDlg_Nun({ field }: { field: Mani.Field; }) {
    const [isOpen, setIsOpen] = useState(false);

    const atoms = useState( //TODO: use memo or update atoms value?
        () => createUiAtoms(
            {
                policy: field.policy || '',
                policy2: field.policy2 || '',
                options: field.options || '',
            },
            ({ get, set }) => {
                debouncedCombinedResultFromAtoms(atoms, get, set);
            })
    )[0];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="px-4 h-full active:scale-[.97] select-none" asChild>
                <Button size="sm">
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="text-xs" container={document.getElementById('portal')}>
                <PolicyEditorBody dlgUiAtoms={atoms} doCloseWithOk={setIsOpen} />
            </DialogContent>
        </Dialog>
    );
}
