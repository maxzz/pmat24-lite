//import { AlertOctagon, AppWindow, Check, ChevronDown, ChevronRight, ChevronUp, Copy, Folder, Layout } from "@/ui/icons/normal/lucid-react";
import { IconLucidAlertOctagon, IconLucidAppWindow, IconLucidCheck, IconLucidChevronDown, IconLucidChevronRight, IconLucidChevronUp, IconLucidCopy, IconLucidFolder, IconLucidLayout } from "@/ui/icons/normal/lucid-react";

export function TestLucidIconsTm() {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 grid gap-2 place-items-center">
                <IconLucidFolder className={demoClasses} />
                <IconLucidLayout className={demoClasses} />
                <IconLucidAppWindow className={demoClasses} />

                <IconLucidChevronUp className={demoClasses} />
                <IconLucidChevronDown className={demoClasses} />
                <IconLucidChevronRight className={demoClasses} />

                <IconLucidCopy className={demoClasses} />
                <IconLucidCheck className={demoClasses} />
                <IconLucidAlertOctagon className={demoClasses} />
            </div>
        </div>
    );
}

const demoClasses = "size-6 text-primary";
