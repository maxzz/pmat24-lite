import { IconL_AlertOctagon, IconL_AppWindow, IconL_Check, IconL_ChevronDown, IconL_ChevronRight, IconL_ChevronUp, IconL_Copy, IconL_Folder, IconL_Layout } from "@/ui/icons";

export function TestLucidIconsTm() {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 grid gap-2 place-items-center">
                <IconL_Folder className={demoClasses} />
                <IconL_Layout className={demoClasses} />
                <IconL_AppWindow className={demoClasses} />

                <IconL_ChevronUp className={demoClasses} />
                <IconL_ChevronDown className={demoClasses} />
                <IconL_ChevronRight className={demoClasses} />

                <IconL_Copy className={demoClasses} />
                <IconL_Check className={demoClasses} />
                <IconL_AlertOctagon className={demoClasses} />
            </div>
        </div>
    );
}

const demoClasses = "size-6 text-primary";
