import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Prim from "@radix-ui/react-checkbox";
import { IconRadix_Check } from "@/ui/icons/normal";
import { cn } from "@/utils";

const CheckboxClasses = "\
peer w-4 h-4 shrink-0 \
\
border-muted-foreground \
\
focus-visible:outline-hidden \
focus-visible:ring-1 \
focus-visible:ring-ring \
\
disabled:cursor-not-allowed \
disabled:opacity-50 \
\
data-[state=checked]:text-accent \
data-[state=checked]:bg-muted-foreground \
\
border rounded-sm shadow";
// original was: border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground

const Checkbox = forwardRef<ElementRef<typeof Prim.Root>, ComponentPropsWithoutRef<typeof Prim.Root>>(
    ({ className, ...rest }, ref) => (
        <Prim.Root ref={ref} className={cn(CheckboxClasses, className)} {...rest}>
            <Prim.Indicator className={cn("flex items-center justify-center text-current")}>
                <IconRadix_Check className="size-4" />
            </Prim.Indicator>
        </Prim.Root>
    )
);
Checkbox.displayName = Prim.Root.displayName;

export { Checkbox };
