import { useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui/shadcn";
import { FormIdx } from "@/store/8-manifest";
import { type ManiAtoms, type FileUsCtx } from "@/store/1-file-mani-atoms/9-types";
import { doDeleteCpassFromFileUsAtom } from "@/store/0-serve-atoms";
import { sawMonitor_doSawOpenForCpassAtom } from "@/components/4-dialogs/2-dlg-create-login/a-create-dialog-atoms/7-0-open-anim-saw-monitor";

export function MenuItem_Cpass({ maniAtoms, fileUsCtx }: { maniAtoms: ManiAtoms; fileUsCtx: FileUsCtx; }) {
    const formCtx = maniAtoms[FormIdx.cpass];

    return (<>
        {formCtx
            ? <MenuItem_DeleteCpass maniAtoms={maniAtoms} fileUsCtx={fileUsCtx} />
            : <MenuItem_CreateCpass maniAtoms={maniAtoms} fileUsCtx={fileUsCtx} />
        }
    </>);
}

function MenuItem_CreateCpass({ maniAtoms, fileUsCtx }: { maniAtoms: ManiAtoms; fileUsCtx: FileUsCtx; }) {
    const openDlg = useSetAtom(sawMonitor_doSawOpenForCpassAtom);

    return (<>
        <DropdownMenuItem
            className="ml-6"
            onClick={openDlg}
        >
            Create Password Change...
        </DropdownMenuItem>
    </>);
}

function MenuItem_DeleteCpass({ maniAtoms, fileUsCtx }: { maniAtoms: ManiAtoms; fileUsCtx: FileUsCtx; }) {
    const doDeleteCpassFromFileUs = useSetAtom(doDeleteCpassFromFileUsAtom);

    return (<>
        <DropdownMenuItem
            className="ml-6"
            onClick={() => doDeleteCpassFromFileUs(fileUsCtx.fileUsAtom)}
        >
            Delete Password Change...
        </DropdownMenuItem>
    </>);
}
