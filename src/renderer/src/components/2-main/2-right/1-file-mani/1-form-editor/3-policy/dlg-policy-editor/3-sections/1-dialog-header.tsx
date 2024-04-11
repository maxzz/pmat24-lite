import { ReactNode } from "react";
import { DialogHeader as Header, DialogDescription, DialogTitle } from "@/ui/shadcn";

export function DialogHeader({ header, subHeader }: { header: ReactNode, subHeader?: ReactNode; }) {
    return (
        <Header>
            <DialogTitle className="text-base">
                {header}
            </DialogTitle>

            <DialogDescription className="text-xs">
                {subHeader}
            </DialogDescription>
        </Header>
    );
}
