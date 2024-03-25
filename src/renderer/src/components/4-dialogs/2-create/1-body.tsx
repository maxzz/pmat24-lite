import { useEffect, useState } from "react";
import { PrimitiveAtom, atom, useAtom, useAtomValue } from "jotai";
import { Button, Checkbox, Label, ScrollArea } from "@/ui";
import * as D from "@/ui/shadcn/dialog";
import { DetectedWindow, detectedWindows } from "./2-test-detected-windows";
import { toast } from "sonner";

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

function ButtonCreate({ selectedIdxAtom }: { selectedIdxAtom: PrimitiveAtom<number>; }) {
    const selectedIdx = useAtomValue(selectedIdxAtom);
    const [toastId, setToastId] = useState<string | number | undefined>(undefined);
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

function WindowsList({ windows, selectedIdxAtom }: { windows: DetectedWindow[]; selectedIdxAtom: PrimitiveAtom<number>; }) {
    const [selectedIdx, setSelectedIdx] = useAtom(selectedIdxAtom);
    return (
        <div className="px-3 py-2 flex flex-col gap-2">
            {detectedWindows.length === 0 && <div className="text-muted-foreground">No windows detected</div>}
            {detectedWindows.length !== 0 && detectedWindows.map((window, idx) => (
                <Label key={window.id} className="text-xs font-normal cursor-pointer flex items-center gap-1">
                    <Checkbox className="size-4" checked={idx === selectedIdx} onCheckedChange={(v) => setSelectedIdx(!!v ? idx : -1)} />
                    <div>{window.name}</div>
                </Label>
            ))}
        </div>
    );
}
