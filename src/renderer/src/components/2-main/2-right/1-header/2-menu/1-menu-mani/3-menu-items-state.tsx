import { useAtom } from "jotai";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { type FileUsCtx } from "@/store";

export function MenuItem_InTestMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const [isInTestMode, setInTestMode] = useAtom(fileUsCtx.fileUs.maniInTestAtom);

    return (<>
        <DropdownMenuCheckboxItem
            checked={isInTestMode}
            onCheckedChange={(checked) => setInTestMode(checked)}
        >
            In Test Mode
        </DropdownMenuCheckboxItem>
    </>);
}

export function MenuItem_InUseMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const [isInUseMode, setInUseMode] = useAtom(fileUsCtx.fileUs.maniInUseAtom);

    return (<>
        <DropdownMenuCheckboxItem
            checked={isInUseMode}
            onCheckedChange={(checked) => setInUseMode(checked)}
        >
            In Use Mode
        </DropdownMenuCheckboxItem>
    </>);
}
