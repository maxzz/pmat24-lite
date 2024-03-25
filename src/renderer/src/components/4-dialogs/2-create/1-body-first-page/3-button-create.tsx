import { useEffect, useState } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { Button } from "@/ui";
import { toast } from "sonner";

export function ButtonCreate({ selectedIdxAtom, toastIdAtom }: { selectedIdxAtom: PrimitiveAtom<number>; toastIdAtom: PrimitiveAtom<string | number | undefined>;}) {
    const selectedIdx = useAtomValue(selectedIdxAtom);
    const [toastId, setToastId] = useAtom(toastIdAtom);

    useEffect(() => () => { toastId && toast.dismiss(toastId); }, [selectedIdx]);

    return (
        <Button variant="default" size="sm"
            onClick={() => {
                let id: string | number | undefined;
                if (selectedIdx === -1) {
                    id = toast('Select application window first.');
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
