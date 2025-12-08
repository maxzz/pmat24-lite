import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuCheckboxItem } from "@/ui/shadcn";
import { type FileUsCtx } from "@/store/2-file-mani-atoms";
import { type FileUs } from "@/store/store-types/0-file-us-type";
import { doSetManiInTestAtom } from "@/store/0-serve-atoms/6-do-inuse-test";
import { modeTextInTest } from "../../../2-file-mani/2-form-options";

export function MenuItems_State({ fileUs }: { fileUs: FileUs; }) {
    return (<>
        <MenuItem_InTestMode fileUs={fileUs} />
    </>);
}

function MenuItem_InTestMode({ fileUs }: { fileUs: FileUs; }) {
    const isInTestMode = useAtomValue(fileUs.maniInTestAtom);
    const doSetInTest = useSetAtom(doSetManiInTestAtom);

    return (
        <DropdownMenuCheckboxItem
            checked={isInTestMode}
            onCheckedChange={(checked) => doSetInTest({ fileUs, inTest: checked })}
        >
            {modeTextInTest}
        </DropdownMenuCheckboxItem>
    );
}
