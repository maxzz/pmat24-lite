import { useAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { type AnyFormCtx, appSettings } from "@/store";

export function MenuItem_InTestMode({ formCtx }: { formCtx: AnyFormCtx; }) {
    const [isInTestMode, setInTestMode] = useAtom(formCtx.fileUsCtx.fileUs.maniInTestAtom);

    return (<>
        <DropdownMenuCheckboxItem
            checked={isInTestMode}
            onCheckedChange={(checked) => setInTestMode(checked)}
        >
            In Test Mode
        </DropdownMenuCheckboxItem>
    </>);
}

export function MenuItem_InUseMode({ formCtx }: { formCtx: AnyFormCtx; }) {
    const [isInUseMode, setInUseMode] = useAtom(formCtx.fileUsCtx.fileUs.maniInUseAtom);

    return (<>
        <DropdownMenuCheckboxItem
            checked={isInUseMode}
            onCheckedChange={(checked) => setInUseMode(checked)}
        >
            In Use Mode
        </DropdownMenuCheckboxItem>
    </>);
}
