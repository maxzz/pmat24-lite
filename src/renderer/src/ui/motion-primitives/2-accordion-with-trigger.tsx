import { ReactNode, useCallback } from 'react';
import { useSnapshot } from 'valtio';
import { classNames } from '@/utils';
import { Accordion, AccordionItem, AccordionContent, useAccordion, AccordionItemAugmentedProps } from './1-accordion'; //https://motion-primitives.com/docs/accordion
import { Button } from '../shadcn';
import { SymbolChevronDown } from '../icons';
import { appSettings } from '@/store';

export function AccordionWithTrigger({ label, formIdx, name, children }: { label: ReactNode; formIdx: number; name: string; children: ReactNode; }) {
    const [open, toggleOpen] = useAccordionState({ formIdx, name });
    return (
        <Accordion
            className='flex w-full flex-col'
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            variants={{
                expanded: { opacity: 1, scale: 1, },
                collapsed: { opacity: 0, scale: 0.7, },
            }}
            expandedValue={open ? name : undefined}
            onValueChange={toggleOpen}
        >
            <AccordionItem value={name}>
                <AccordionTrigger className={triggerClasses}>
                    {label}
                </AccordionTrigger>

                <AccordionContent className={contentClasses}>
                    {children}
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}

function AccordionTrigger({ children, className, ...rest }: { children: ReactNode; className?: string; }) {
    const { toggleItem, expandedValue } = useAccordion();
    const value = (rest as AccordionItemAugmentedProps).value;
    const isExpanded = value === expandedValue;
    return (
        <Button
            className={classNames("w-full", sectionButtonClasses)} aria-expanded={isExpanded} {...(isExpanded ? { 'data-expanded': '' } : { 'data-closed': '' })}
            onClick={() => value !== undefined && toggleItem(value)}
        >
            <div className="w-full text-start">
                {children}
            </div>

            <SymbolChevronDown className={classNames("size-4 text-muted-foreground", isExpanded ? "rotate-0 transition-transform" : "-rotate-90 transition-transform")} />
        </Button>
    );
}

function useAccordionState({ formIdx, name }: { formIdx: number; name: string; }) {
    const open: boolean = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    const toggleOpen = useCallback(
        () => {
            appSettings.right.mani.openInOptions[formIdx][name] = !appSettings.right.mani.openInOptions[formIdx][name];
        }, [formIdx, name]
    );

    return [open, toggleOpen] as const;
}

const triggerClasses = 'w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50';
const contentClasses = 'origin-left';
const sectionButtonClasses = "mt-1 font-normal border-border flex items-center gap-1";
