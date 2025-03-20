import { type ComponentPropsWithoutRef } from "react";
import { Label } from "@/ui";

export const subClasses = "py-1 flex flex-col gap-2";
export const rowClasses = "text-xs font-normal flex place-items-center gap-1.5 cursor-pointer";

const labelBoldClasses = "block mb-1 text-xs font-semibold border-b border-border";

export function SectionTitle({ title, children, ...rest }: { title: string; } & ComponentPropsWithoutRef<"div">) {
    return (
        <div {...rest}>
            <Label className={labelBoldClasses}>
                {title}
            </Label>

            {children}
        </div>
    );
}
