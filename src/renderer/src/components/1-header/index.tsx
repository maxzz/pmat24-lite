import { useState } from "react";
import { ThemeSwitch } from "@/ui/shadcn/theme-toggle-switch";
import { DropdownMenuDemo } from "./1-dropdown-menu";
import { test } from "@/utils/fnames-common-path";
import { FileInputDlg } from "@/xternal-to-main/commands/20-web-open-files";

test();

export function SectionHeader() {
    const [open, setOpen] = useState(false);
    return (
        <div className="px-4 py-2 bg-muted border-border/50 border-b flex items-center justify-between">
            <DropdownMenuDemo />

            <li className="mx-1 px-4 py-1 hover:text-green-100 hover:bg-green-700 rounded-sm cursor-pointer">
                <label className="cursor-pointer">
                    <FileInputDlg onChangeDone={() => setOpen((v) => !v)} openFolder={true} />
                    <div className="">Open Folder...</div>
                </label>
            </li>
            
            <ThemeSwitch />
        </div>
    );
}
