import { type AriaAttributes, type ComponentPropsWithoutRef, type ReactNode, useCallback } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { Accordion, AccordionItem, AccordionContent, useAccordion, AccordionItemAugmentedProps } from "./1-accordion"; //https://motion-primitives.com/docs/accordion
import { Button } from "../shadcn";
import { SymbolChevronDown } from "../icons";
import { appSettings } from "@/store";

type AccordionWithTriggerProps = {
    triggerText: ReactNode;
    formIdx: number;
    name: string;
    children: ReactNode;
    triggerClasses?: string;
    contentClasses?: string;
};

export function AccordionWithTrigger({ triggerText, formIdx, name, children, triggerClasses, contentClasses }: AccordionWithTriggerProps) {
    const [open, toggleOpen] = useAccordionState({ formIdx, name });
    return (
        <Accordion
            className="w-full flex flex-col"
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            variants={{
                expanded: { opacity: 1, scale: 1, },
                collapsed: { opacity: 0, scale: 0.7, },
            }}
            expandedValue={open ? name : undefined}
            onValueChange={toggleOpen}
        >
            <AccordionItem value={name}>
                <AccordionTrigger className={triggerClasses}>
                    {triggerText}
                </AccordionTrigger>

                <AccordionContent className={classNames("origin-left", contentClasses)}>
                    {children}
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}

function AccordionTrigger({ children, className, ...rest }: { children: ReactNode; } & ComponentPropsWithoutRef<"button">) {
    const { toggleItem, expandedValue } = useAccordion();
    const value = (rest as AccordionItemAugmentedProps).value;
    const isExpanded = value === expandedValue;
    return (
        <Button className={classNames(triggerClasses, className)} {...ariaExpandedAttrs(isExpanded)} onClick={() => value !== undefined && toggleItem(value)} {...rest}>
            {children}
            <SymbolChevronDown className={classNames("size-4 text-muted-foreground transition-transform", isExpanded ? "rotate-0" : "-rotate-90")} />
        </Button>
    );
}

function ariaExpandedAttrs(isExpanded: boolean): AriaAttributes {
    return {
        "aria-expanded": isExpanded,
        ...(isExpanded ? { "data-expanded": '' } : { "data-closed": '' }),
    };
}

const triggerClasses = "w-full flex items-center justify-between gap-1";

// Utilities

function useAccordionState({ formIdx, name }: { formIdx: number; name: string; }) {
    const open: boolean = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    const toggleOpen = useCallback(
        () => {
            appSettings.right.mani.openInOptions[formIdx][name] = !appSettings.right.mani.openInOptions[formIdx][name];
        }, [formIdx, name]
    );

    return [open, toggleOpen] as const;
}
