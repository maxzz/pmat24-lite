import { useEffect } from "react";
import { PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { toast } from "sonner";
import { SecondPage, doOpenCreateDialogAtom, doOpenCreateDialogSecondAtom } from "@/store/atoms/4-dialogs";

export function ButtonCreate({ selectedIdxAtom, toastIdAtom }: { selectedIdxAtom: PrimitiveAtom<number>; toastIdAtom: PrimitiveAtom<string | number | undefined>; }) {
    const selectedIdx = useAtomValue(selectedIdxAtom);
    const [toastId, setToastId] = useAtom(toastIdAtom);

    useEffect(() => () => { toastId && toast.dismiss(toastId); }, [toastId, selectedIdx]);

    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    const doOpenCreateDialogSecond = useSetAtom(doOpenCreateDialogSecondAtom);
    return (
        <Button variant="default" size="sm"
            onClick={() => {
                let id: string | number | undefined;
                if (selectedIdx === -1) {
                    id = toast('Select application window first.');
                } else if (selectedIdx === 1) {
                    doOpenCreateDialogSecond(SecondPage.grab);
                    doOpenCreateDialog(false);
                    return;
                } else {
                    id = toast('No login fields detected.');
                }
                id && setToastId(id);
            }}
        >
            Create manifest
        </Button>
    );
}
