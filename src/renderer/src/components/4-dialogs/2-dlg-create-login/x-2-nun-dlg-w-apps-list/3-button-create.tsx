import { useEffect } from "react";
import { PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { toaster } from "@/ui/local-ui";
import { SecondPage, doOpenCreateDialogAtom, doOpenCreateDialogSecondAtom, doOpenCreateManiAtom } from "@/store/4-dialogs-atoms";

export function ButtonCreate({ selectedIdxAtom, toastIdAtom }: { selectedIdxAtom: PrimitiveAtom<number>; toastIdAtom: PrimitiveAtom<string | number | undefined>; }) {
    const selectedIdx = useAtomValue(selectedIdxAtom);
    const [toastId, setToastId] = useAtom(toastIdAtom);

    useEffect(() => () => { toastId && toaster.dismiss(toastId); }, [toastId, selectedIdx]);

    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    const doOpenCreateDialogSecond = useSetAtom(doOpenCreateDialogSecondAtom);
    const doOpenDrawer = useSetAtom(doOpenCreateManiAtom);
    
    return (
        <Button variant="default" size="sm"
            onClick={() => {
                let id: string | number | undefined;
                if (selectedIdx === -1) {
                    id = toaster('Select application window first.');
                } else if (selectedIdx === 1) {
                    // doOpenCreateDialogSecond(SecondPage.grab);
                    // doOpenDrawer(true);
                    setTimeout(() => doOpenDrawer(true), 0);
                    doOpenCreateDialog(false);
                    return;
                } else {
                    id = toaster('No login fields detected.');
                }
                id && setToastId(id);
            }}
        >
            Create manifest
        </Button>
    );
}
