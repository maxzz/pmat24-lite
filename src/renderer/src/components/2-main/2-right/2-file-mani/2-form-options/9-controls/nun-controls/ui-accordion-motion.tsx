//"use client"; //https://github.com/maxzz/test-motion-primitives/blob/main/src/components/motion-ui/accordion.tsx
import { createContext, useContext, useState, type ReactNode, type Key as ReactKey, Children, cloneElement, isValidElement } from "react";
import { motion, AnimatePresence, type Transition, type Variants, type Variant, MotionConfig, } from "motion/react";
import { classNames } from "@/utils";

type AccordionProps = {
    children: ReactNode;
    className?: string;
    transition?: Transition;
    variants?: { expanded: Variant; collapsed: Variant; };
    expandedValue?: ReactKey | null;
    onValueChange?: (value: ReactKey | null) => void;
};

export function Accordion({ children, className, transition, variants, expandedValue, onValueChange, }: AccordionProps) {
    return (
        <MotionConfig transition={transition}>
            <div className={classNames("relative", className)} aria-orientation="vertical">
                <AccordionProviderStateHolder
                    variants={variants}
                    expandedValue={expandedValue}
                    onValueChange={onValueChange}
                >
                    {children}
                </AccordionProviderStateHolder>
            </div>
        </MotionConfig>
    );
}

// Context provider

type AccordionContextType = {
    expandedValue: ReactKey | null;
    toggleItem: (value: ReactKey) => void;
    variants?: {
        expanded: Variant;
        collapsed: Variant;
    };
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

function useAccordion() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error('useAccordion must be used within an AccordionProvider');
    }
    return context;
}

type AccordionProviderProps = {
    children: ReactNode;
    variants?: { expanded: Variant; collapsed: Variant; };
    expandedValue?: ReactKey | null;
    onValueChange?: (value: ReactKey | null) => void;
};

function AccordionProviderStateHolder({ children, variants, expandedValue: externalExpandedValue, onValueChange, }: AccordionProviderProps) {
    const [internalExpandedValue, setInternalExpandedValue] = useState<ReactKey | null>(null);

    const expandedValue = externalExpandedValue !== undefined
        ? externalExpandedValue
        : internalExpandedValue;

    function toggleItem(value: ReactKey) {
        const newValue = expandedValue === value ? null : value;
        if (onValueChange) {
            onValueChange(newValue);
        } else {
            setInternalExpandedValue(newValue);
        }
    }

    return (
        <AccordionContext.Provider value={{ expandedValue, toggleItem, variants }}>
            {children}
        </AccordionContext.Provider>
    );
}

// AccordionContent

type AccordionContentProps = {
    children: ReactNode;
    className?: string;
};

export function AccordionContent({ children, className, ...rest }: AccordionContentProps) {
    const { expandedValue, variants } = useAccordion();

    const value = (rest as { value?: ReactKey; }).value;
    const isExpanded = value === expandedValue;

    const BASE_VARIANTS: Variants = {
        expanded: { height: "auto", opacity: 1 },
        collapsed: { height: 0, opacity: 0 },
    };

    const combinedVariants = {
        expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
        collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
    };

    return (
        <AnimatePresence initial={false}>
            {isExpanded && (
                <motion.div
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={combinedVariants}
                    className={className}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// AccordionTrigger

type AccordionTriggerProps = {
    value?: ReactKey;
    className?: string;
    children: ReactNode;
};

export function AccordionTrigger({ value, className, children, }: AccordionTriggerProps) {
    const { toggleItem, expandedValue } = useAccordion();
    const isExpanded = value === expandedValue;
    return (
        <button
            className={classNames("group", className)}
            type="button"
            aria-expanded={isExpanded}
            {...(isExpanded ? { 'data-expanded': '' } : { 'data-closed': '' })}
            onClick={() => value !== undefined && toggleItem(value)}
        >
            {children}
        </button>
    );
}

// AccordionItem

type AccordionItemProps = {
    value: ReactKey;
    className?: string;
    children: ReactNode;
};

export function AccordionItem({ value, className, children, }: AccordionItemProps) {
    const { expandedValue } = useAccordion();
    const isExpanded = value === expandedValue;
    return (
        <div
            className={classNames("overflow-hidden", className)}
            {...(isExpanded ? { "data-expanded": "" } : { "data-closed": "" })}
        >
            {Children.map(children,
                (child) => {
                    if (isValidElement(child)) {
                        return cloneElement(child, { ...child.props as any, value, expanded: isExpanded, });
                    }
                    return child;
                }
            )}
        </div>
    );
}
