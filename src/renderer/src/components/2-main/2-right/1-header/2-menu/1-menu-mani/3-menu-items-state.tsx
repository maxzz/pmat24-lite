import { useAtom } from "jotai";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { type FileUsCtx } from "@/store";

export function MenuItems_State({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    return (<>
        <MenuItem_InUseMode fileUsCtx={fileUsCtx} />
        <MenuItem_InTestMode fileUsCtx={fileUsCtx} />
    </>);
}

function MenuItem_InUseMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const [isInUseMode, setInUseMode] = useAtom(fileUsCtx.fileUs.maniInUseAtom);

    return (
        <DropdownMenuCheckboxItem
            checked={isInUseMode}
            onCheckedChange={(checked) => setInUseMode(checked)}
        >
            The manifest is in production
        </DropdownMenuCheckboxItem>
    );
}

function MenuItem_InTestMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const [isInTestMode, setInTestMode] = useAtom(fileUsCtx.fileUs.maniInTestAtom);

    return (
        <DropdownMenuCheckboxItem
            checked={isInTestMode}
            onCheckedChange={(checked) => setInTestMode(checked)}
        >
            Test Mode
        </DropdownMenuCheckboxItem>
    );
}
