import { useState } from "react";
import { Meta } from "@/store/manifest";
import { createUiAtoms, debouncedCombinedResultFromAtoms } from "./0-create-ui-atoms";
import { Button, Dialog, DialogContent, DialogTrigger } from "@/ui";
import { PolicyEditorBody } from "./2-dlg-body";

export function PolicyEditorDlg({ field }: { field: Meta.Field; }) {
    const [open, setOpen] = useState(false);

    const atoms = useState( //TODO: use memo or update atoms value?
        () => createUiAtoms({ policy: field.mani.policy, policy2: field.mani.policy2 }, ({ get, set }) => debouncedCombinedResultFromAtoms(atoms, get, set))
    )[0];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="px-4 h-full active:scale-[.97] select-none" asChild>
                <Button size="sm">
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="text-xs" container={document.getElementById('portal')}>
                <PolicyEditorBody atoms={atoms} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}
