//"use client";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Prim from "@radix-ui/react-select";
import { CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, } from "@radix-ui/react-icons";
import { cn } from "@/utils";

const Select = Prim.Root;
const SelectGroup = Prim.Group;
const SelectValue = Prim.Value;

const selectTriggerClasses = "\
px-3 py-2 h-9 w-full text-sm \
\
bg-transparent \
placeholder:text-muted-foreground \
\
border-input \
\
ring-offset-background \
\
focus:outline-none \
focus:ring-1 \
focus:ring-ring \
\
disabled:cursor-not-allowed \
disabled:opacity-50 \
\
border rounded-md shadow-sm \
\
whitespace-nowrap \
[&>span]:line-clamp-1 \
\
flex items-center justify-between";

const SelectTrigger = forwardRef<ElementRef<typeof Prim.Trigger>, ComponentPropsWithoutRef<typeof Prim.Trigger>>(
    ({ className, children, ...props }, ref) => (
        <Prim.Trigger
            ref={ref}
            className={cn(selectTriggerClasses, className)}
            {...props}
        >
            {children}
            <Prim.Icon asChild>
                <CaretSortIcon className="h-4 w-4 opacity-50" />
            </Prim.Icon>
        </Prim.Trigger>
    )
);
SelectTrigger.displayName = Prim.Trigger.displayName;

const SelectScrollUpButton = forwardRef<ElementRef<typeof Prim.ScrollUpButton>, ComponentPropsWithoutRef<typeof Prim.ScrollUpButton>>(
    ({ className, ...props }, ref) => (
        <Prim.ScrollUpButton
            ref={ref}
            className={cn("flex cursor-default items-center justify-center py-1", className)}
            {...props}
        >
            <ChevronUpIcon />
        </Prim.ScrollUpButton>
    )
);
SelectScrollUpButton.displayName = Prim.ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<ElementRef<typeof Prim.ScrollDownButton>, ComponentPropsWithoutRef<typeof Prim.ScrollDownButton>>(
    ({ className, ...props }, ref) => (
        <Prim.ScrollDownButton
            ref={ref}
            className={cn("flex cursor-default items-center justify-center py-1", className)}
            {...props}
        >
            <ChevronDownIcon />
        </Prim.ScrollDownButton>
    )
);
SelectScrollDownButton.displayName = Prim.ScrollDownButton.displayName;

const selectContentClasses = "\
z-50 relative min-w-[8rem] max-h-96 \
\
text-popover-foreground bg-popover \
\
data-[state=open]:animate-in \
data-[state=open]:fade-in-0 \
data-[state=open]:zoom-in-95 \
\
data-[state=closed]:animate-out \
data-[state=closed]:fade-out-0 \
data-[state=closed]:zoom-out-95 \
\
data-[side=top]:slide-in-from-bottom-2 \
data-[side=right]:slide-in-from-left-2 \
data-[side=bottom]:slide-in-from-top-2 \
data-[side=left]:slide-in-from-right-2 \
\
overflow-hidden \
border rounded-md shadow-md";

const selectContentPopperClasses = "\
data-[side=top]:-translate-y-1 \
data-[side=right]:translate-x-1 \
data-[side=bottom]:translate-y-1 \
data-[side=left]:-translate-x-1";

const selectContentViewportPopperClasses = "\
w-full \
min-w-[var(--radix-select-trigger-width)] \
h-[var(--radix-select-trigger-height)]";

const SelectContent = forwardRef<ElementRef<typeof Prim.Content>, ComponentPropsWithoutRef<typeof Prim.Content>>(
    ({ className, children, position = "popper", ...props }, ref) => (
        <Prim.Portal>
            <Prim.Content
                ref={ref}
                className={cn(selectContentClasses, position === "popper" && selectContentPopperClasses, className)}
                position={position}
                {...props}
            >
                <SelectScrollUpButton />

                <Prim.Viewport className={cn("p-1", position === "popper" && selectContentViewportPopperClasses)}>
                    {children}
                </Prim.Viewport>

                <SelectScrollDownButton />
            </Prim.Content>
        </Prim.Portal>
    )
);
SelectContent.displayName = Prim.Content.displayName;

const SelectLabel = forwardRef<ElementRef<typeof Prim.Label>, ComponentPropsWithoutRef<typeof Prim.Label>>(
    ({ className, ...props }, ref) => (
        <Prim.Label
            ref={ref}
            className={cn("px-2 py-1.5 text-sm font-semibold", className)}
            {...props}
        />
    )
);
SelectLabel.displayName = Prim.Label.displayName;

const selectItemClasses = "\
relative py-1.5 pl-2 pr-8 w-full text-sm \
\
focus:text-accent-foreground \
focus:bg-accent \
\
data-[disabled]:opacity-50 \
data-[disabled]:pointer-events-none \
\
rounded-sm outline-none select-none cursor-default \
\
flex items-center";

const SelectItem = forwardRef<ElementRef<typeof Prim.Item>, ComponentPropsWithoutRef<typeof Prim.Item>>(
    ({ className, children, ...props }, ref) => (
        <Prim.Item
            ref={ref}
            className={cn(
                selectItemClasses,
                className
            )}
            {...props}
        >
            <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                <Prim.ItemIndicator>
                    <CheckIcon className="h-4 w-4" />
                </Prim.ItemIndicator>
            </span>
            <Prim.ItemText>{children}</Prim.ItemText>
        </Prim.Item>
    )
);
SelectItem.displayName = Prim.Item.displayName;

const SelectSeparator = forwardRef<ElementRef<typeof Prim.Separator>, ComponentPropsWithoutRef<typeof Prim.Separator>>(
    ({ className, ...props }, ref) => (
        <Prim.Separator
            ref={ref}
            className={cn("-mx-1 my-1 h-px bg-muted", className)}
            {...props}
        />
    )
);
SelectSeparator.displayName = Prim.Separator.displayName;

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
};
