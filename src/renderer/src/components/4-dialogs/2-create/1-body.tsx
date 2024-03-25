import { Button, Checkbox, Label, ScrollArea } from "@/ui";
import * as D from "@/ui/shadcn/dialog";
import { detectedWindows } from "./2-test-detected-windows";

export function DialogCreateManiBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
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

                <div className="mb-1">
                    Application windows
                </div>

                <div className="border-border border rounded">
                    <ScrollArea className="h-[25vh]">
                        <div className="px-3 py-2 flex flex-col gap-2">
                            {detectedWindows.length === 0 && <div className="text-muted-foreground">No windows detected</div>}
                            {detectedWindows.length !== 0 && detectedWindows.map((window) => (
                                <Label key={window.id} className="text-xs font-normal flex items-center gap-1">
                                    <Checkbox className="size-4" />
                                    <div>{window.name}</div>
                                </Label>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Button variant="default" size="sm">Create manifest</Button>
                </div>

            </div>

        </div>
    );
}
