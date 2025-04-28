import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doVerifyNameBeforeSaveAtom, fileUsOfRightPanelAtom, rightPanelAtom } from "@/store";

export function TestManiName() {
    const doVerifyNameBeforeSave = useSetAtom(doVerifyNameBeforeSaveAtom);
    const rightPanel = useAtomValue(rightPanelAtom);
    return (
        <Button className="text-[.65rem]" disabled={!rightPanel} onClick={() => doVerifyNameBeforeSave()}>
            Name...
        </Button>
    );
}
// export function TestManiName() {
//     const doOpenManiNameDialog = useSetAtom(doOpenManiNameDialogAtom);
//     const rightPanel = useAtomValue(rightPanelAtom);
//     return (
//         <Button className="text-[.65rem]" disabled={!rightPanel} onClick={() => doOpenManiNameDialog(true)}>
//             Name...
//         </Button>
//     );
// }
