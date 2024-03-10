import { useState } from "react";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { DropdownMenuDemo } from "./1-dropdown-menu";
import { test } from "@/utils/fnames-common-path";
import { FileInputDlg } from "@/xternal-to-main/commands/20-web-open-files";
import { Button } from "@/ui";

test();

export function SectionHeader() {
    const [open, setOpen] = useState(false);
    return (
        <div className="px-4 py-2 bg-muted border-border/50 border-b flex items-center justify-between">
            <DropdownMenuDemo />

            <Button asChild>
                <label className="cursor-pointer">
                    <FileInputDlg onChangeDone={() => setOpen((v) => !v)} openFolder={false} />
                    <div className="">Open Folder...</div>
                </label>
            </Button>

            <ThemeSwitch />
        </div>
    );
}
