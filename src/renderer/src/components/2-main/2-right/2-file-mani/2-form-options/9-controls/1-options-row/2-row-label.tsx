import { ReactNode } from "react";
import { Label } from "@/ui";

export function RowLabel({ label, children }: { label: string; children: ReactNode; }) {
    return (
        <Label className={"col-span-2 py-0.5 pr-0.5 text-xs grid grid-cols-subgrid items-center"} onClick={
            (e) => {
                console.log("RowLabel.onClick", e.target);

                if (e.target instanceof HTMLInputElement && e.target.tagName !== "INPUT") {
                    console.log("RowLabel.onClick", e.target.tagName);
                    
                    e.stopPropagation();
                }
            }
            }>
            <div className="font-light">
                {label}
            </div>

            {children}
        </Label>
    );
}
