import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { modeTextInTest, modeTextInUse } from "../../../2-file-mani/2-form-options";
import { type FileUsCtx } from "@/store";
import { doSetInTestAtom, doSetInUseAtom } from "../../../2-file-mani/2-form-options/5-do-inuse-test";

export function MenuItems_State({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    return (<>
        <MenuItem_InUseMode fileUsCtx={fileUsCtx} />
        <MenuItem_InTestMode fileUsCtx={fileUsCtx} />
    </>);
}

function MenuItem_InUseMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const notInUse = useAtomValue(fileUsCtx.fileUs.maniInUseAtom);
    const doSetInUse = useSetAtom(doSetInUseAtom);

    return (
        <DropdownMenuCheckboxItem
            checked={!notInUse}
            onCheckedChange={(checked) => doSetInUse(fileUsCtx, !checked)}
        >
            {modeTextInUse}
        </DropdownMenuCheckboxItem>
    );
}

function MenuItem_InTestMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const isInTestMode = useAtomValue(fileUsCtx.fileUs.maniInTestAtom);
    const doSetInTest = useSetAtom(doSetInTestAtom);

    return (
        <DropdownMenuCheckboxItem
            checked={isInTestMode}
            onCheckedChange={(checked) => doSetInTest(fileUsCtx, checked)}
        >
            {modeTextInTest}
        </DropdownMenuCheckboxItem>
    );
}
