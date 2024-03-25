import { useEffect, useState } from "react";
import { PrimitiveAtom, useAtomValue } from "jotai";
import { Button } from "@/ui";
import { toast } from "sonner";

export function ButtonCreate({ selectedIdxAtom }: { selectedIdxAtom: PrimitiveAtom<number>; }) {
    const selectedIdx = useAtomValue(selectedIdxAtom);
    const [toastId, setToastId] = useState<string | number | undefined>();
    useEffect(() => () => { toastId && toast.dismiss(toastId); }, [toastId, selectedIdx]);
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
