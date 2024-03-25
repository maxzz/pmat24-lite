import { useState } from "react";
import { atom } from "jotai";
import { Button, ScrollArea } from "@/ui";
import * as D from "@/ui/shadcn/dialog";
import { detectedWindows } from "./4-test-detected-windows";
import { ButtonCreate } from "./3-button-create";
import { WindowsList } from "./2-windows-list";

export function DialogCreateManiBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    const selectedIdxAtom = useState(() => atom(-1))[0];
    return (
        <div className="min-h-56 text-xs">

            <D.DialogHeader className="relative text-base font-bold flex items-center">
                <div className="py-4">Create manifest</div>
                <D.DialogCloseButton onClick={() => setIsOpen(false)} tabIndex={-1} />
            </D.DialogHeader>

            <div className="px-4 py-4">
                <div className="mb-4">
                    Select the login window for which you will create a manifest.
                </div>

                <div className="mb-1 flex items-center justify-between">
                    Application windows
                    <Button className="font-normal" variant="ghost" size="xs">
                        Refresh
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
                    <ButtonCreate selectedIdxAtom={selectedIdxAtom} />
                </div>

            </div>

        </div>
    );
}


