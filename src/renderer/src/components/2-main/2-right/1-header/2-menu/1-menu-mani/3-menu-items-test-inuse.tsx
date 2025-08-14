import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { modeTextInTest } from "../../../2-file-mani/2-form-options";
import { doSetManiInTestAtom } from "@/store/1-atoms/0-serve-atoms/5-do-inuse-test";

export function MenuItems_State({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    return (<>
        {/* <MenuItem_InUseMode fileUsCtx={fileUsCtx} /> */}
        <MenuItem_InTestMode fileUsCtx={fileUsCtx} />
    </>);
}

function MenuItem_InTestMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    const isInTestMode = useAtomValue(fileUsCtx.fileUs.maniInTestAtom);
    const doSetInTest = useSetAtom(doSetManiInTestAtom);

    return (
        <DropdownMenuCheckboxItem
            checked={isInTestMode}
            onCheckedChange={(checked) => doSetInTest({ fileUsCtx, inTest: checked })}
        >
            {modeTextInTest}
        </DropdownMenuCheckboxItem>
    );
}

// function MenuItem_InUseMode({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
//     const notInUse = !useAtomValue(fileUsCtx.fileUs.maniInUseAtom);
//     const doSetManiInUse = useSetAtom(doSetManiInUseAtom);

//     return (
//         <DropdownMenuCheckboxItem
//             checked={notInUse}
//             onCheckedChange={(checked) => doSetManiInUse({ fileUsCtx, inUse: !checked })}
//         >
//             {modeTextInUse}
//         </DropdownMenuCheckboxItem>
//     );
// }
