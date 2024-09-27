import { useSetAtom } from "jotai";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { MainDropdownMenu } from "../1-main-menu";
import { Button } from "@/ui";
import { doOpenCreateDialogAtom, doOpenDrawerAtom } from "@/store/atoms/7-dialogs";
import { IconExPol02Fido, IconExPol01Face, IconExPol03Bluetooth, IconExPol04Proxy } from "@/ui/icons/normal/extended-policy";

export function SectionHeader() {
    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    const doOpenDrawer = useSetAtom(doOpenDrawerAtom);

    return (
        <div className="px-4 py-2 bg-muted/20 border-border/50 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MainDropdownMenu />

                <Button variant="outline" className="text-[.65rem]" onClick={() => doOpenCreateDialog(true)}>
                    Create mani
                </Button>

                <Button variant="outline" className="text-[.65rem]" onClick={() => doOpenDrawer(true)}>
                    Create
                </Button>

                <IconExPol01Face className="size-5" />
                <IconExPol02Fido className="size-5" />
                <IconExPol03Bluetooth className="size-5" />
                <IconExPol04Proxy className="size-5" />
            </div>

            <ThemeSwitch />
        </div>
    );
}
