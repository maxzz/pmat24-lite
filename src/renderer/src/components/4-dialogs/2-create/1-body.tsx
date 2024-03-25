import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import * as D from "@/ui/shadcn/dialog";
import { Button, Checkbox, Label } from "@/ui";

const detectedWindows = [
    {
        id: 1,
        name: "Login window",
        url: "https://example.com/login",
    },
    {
        id: 2,
        name: "Register window",
        url: "https://example.com/register",
    },
    {
        id: 3,
        name: "Forgot password window",
        url: "https://example.com/forgot-password",
    },
];

export function DialogCreateManiBody({ setIsOpen }: { setIsOpen: (v: boolean) => void; }) {
    const snap = useSnapshot(appSettings).ui.fileListItems;
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

                <div className="mb-2">
                    Windows
                </div>

                <div className="h-64 flex flex-col gap-2">
                    {detectedWindows.map((window) => (
                        <Label key={window.id} className="text-xs font-normal flex items-center gap-1">
                            <Checkbox className="size-4" />
                            <div>{window.name}</div>
                        </Label>
                    ))}
                </div>

                <div className="flex items-center justify-end">
                    <Button className="mt-4">Create manifest</Button>
                </div>

            </div>

        </div>
    );
}
