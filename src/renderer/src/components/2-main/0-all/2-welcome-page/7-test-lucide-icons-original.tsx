import { AlertOctagon, AppWindow, Check, ChevronDown, ChevronRight, ChevronUp, Copy, Folder, Layout } from "lucide-react";

export function TestLucidIconsOrg() {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 grid gap-2 place-items-center">
                <Folder className="text-primary" />
                <Layout className="text-primary" />
                <AppWindow className="text-primary" />

                <ChevronUp className="text-primary" />
                <ChevronDown className="text-primary" />
                <ChevronRight className="text-primary" />

                <Copy className="text-primary" />
                <Check className="text-primary" />
                <AlertOctagon className="text-primary" />
            </div>
        </div>
    );
}
