import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuCheckboxItem, DropdownMenuItem } from "@/ui/shadcn";
import { type ManiAtoms, type FileUsCtx } from "@/store/2-file-mani-atoms";
import { FormIdx } from "@/store/8-manifest";

export function MenuItems_Launch({ maniAtoms, fileUsCtx }: { maniAtoms: ManiAtoms; fileUsCtx: FileUsCtx; }) {
    const loginFormCtx = maniAtoms[FormIdx.login];
    const ctx = loginFormCtx?.options.isWebAtom;
    const isWeb = useAtomValue();
    return (<>
        {/* <MenuItem_InUseMode fileUsCtx={fileUsCtx} /> */}
        <MenuItem_Launch fileUsCtx={fileUsCtx} />
    </>);
}

function MenuItem_Launch({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const isWeb = useAtomValue(fileUsCtx.fileUs.isWebAtom);
    return (<>
        <DropdownMenuItem
            className="pl-8"
            onClick={(event) => {

            }}
        >
            Launch login URL
        </DropdownMenuItem>

        <DropdownMenuItem
            className="pl-8"
            onClick={(event) => {

            }}
        >
            Launch Password Change URL
        </DropdownMenuItem>
    </>);
}
