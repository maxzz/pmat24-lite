import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { toast } from "sonner";
import * as D from "@/ui/shadcn/dialog";
import { Button, ScrollArea } from "@/ui";
import { IconRefresh } from "@/ui/icons";
import { WindowsList } from "./2-windows-list";
import { ButtonCreate } from "./3-button-create";
import { detectedWindows } from "./4-test-detected-windows";

export function DialogCreateManiBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    // const selectedIdxAtom = useState(() => atom(-1))[0];
    const selectedIdxAtom = useState(() => atom(1))[0];

    const toastIdAtom = useState(() => atom<string | number | undefined>(undefined))[0];
    const [toastId, setToastId] = useAtom(toastIdAtom);

    useEffect(() => () => { toastId && toast.dismiss(toastId); }, [toastId]);

    return (
        <div className="min-h-56 text-xs">

            <D.DialogHeader className="relative text-base font-bold flex items-center">
                <D.DialogTitle asChild>
                    <div className="py-4">New manifest</div>
                </D.DialogTitle>

                <D.DialogCloseButton onClick={() => setIsOpen(false)} tabIndex={-1} />
            </D.DialogHeader>

            <div className="px-4 py-4">
                <div className="mb-4">
                    Select the login window for which you will create a manifest.
                </div>

                <div className="mb-1 flex items-center justify-between">
                    Application windows

                    <Button className="font-normal" variant="outline" size="xs" onClick={() => setToastId(toast('Updated'))} tabIndex={-1}>
                        <IconRefresh className="size-3" title="Refresh windows list" />
                    </Button>
                </div>

                <div className="border-border border rounded">
                    <ScrollArea className="h-[25vh]">
                        <WindowsList windows={detectedWindows} selectedIdxAtom={selectedIdxAtom} />
                    </ScrollArea>
                </div>

                {/* <div className="my-4">
                    No login fields detected
                </div> */}

                <div className="mt-4 flex items-center justify-end">
                    <ButtonCreate selectedIdxAtom={selectedIdxAtom} toastIdAtom={toastIdAtom} />
                </div>

            </div>

        </div>
    );
}
