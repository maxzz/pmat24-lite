import { useSnapshot } from 'valtio';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, useAccordion, AccordionItemAugmentedProps, } from './1-accordion'; //https://motion-primitives.com/docs/accordion
import { ChevronRight } from 'lucide-react';
import { appSettings } from '@/store';
import { FormIdx } from '@/store/manifest';
import { Button } from '../shadcn';
import { classNames } from '@/utils';
import { SymbolChevronDown } from '../icons';
import { ReactNode, useCallback } from 'react';

export function AccordionWithTrigger({ formIdx, name }: { formIdx: number; name: string; }) {
    const [open, toggleOpen] = useAccordionState({ formIdx, name });
    return (
        <Accordion
            className='flex w-full flex-col'
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            variants={{
                expanded: {
                    opacity: 1,
                    scale: 1,
                },
                collapsed: {
                    opacity: 0,
                    scale: 0.7,
                },
            }}
            expandedValue={open ? name : undefined}
            onValueChange={toggleOpen}
        >
            <AccordionItem value={name} className='py-2'>
                <AccordionTrigger2 className={triggerClasses} label='Screen detection'>
                    {/* <div className='flex items-center'>
                        {ChevronRightIcon}
                        <div className={triggerTextClasses}>
                            Screen detection
                        </div>
                        <SymbolChevronDown
                            className={classNames("size-4 text-muted-foreground", open ? "rotate-0 transition-transform" : "-rotate-90 transition-transform")}
                        />
                    </div> */}

                </AccordionTrigger2>
                <AccordionContent className={contentClasses}>
                    <p className={textClasses}>
                        Kick off your experience by setting up Motion-Primitives. This
                        section covers the basics of installation and how to add animations
                        to your projects. You’ll get familiar with the initial setup and the
                        core features quickly.
                    </p>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}

const triggerClasses = 'w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50';
const triggerTextClasses = 'ml-2 text-zinc-950 dark:text-zinc-50';
const contentClasses = 'origin-left';
const textClasses = 'pl-6 pr-2 text-zinc-500 dark:text-zinc-400';

const ChevronRightIcon = <ChevronRight className='h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50' />;

function useAccordionState({ formIdx, name }: { formIdx: number; name: string; }) {
    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    const toggleOpen = useCallback(
        () => {
            appSettings.right.mani.openInOptions[formIdx][name] = !appSettings.right.mani.openInOptions[formIdx][name];
        }, [formIdx, name]
    );

    return [open, toggleOpen];
}

type AccordionTriggerProps = { label: string, children?: ReactNode; className?: string; };

export function AccordionTrigger2({ label, children, className, ...rest }: AccordionTriggerProps) {
    const { toggleItem, expandedValue } = useAccordion();
    const value = (rest as AccordionItemAugmentedProps).value;
    const isExpanded = value === expandedValue;
    return (<>
        <Button className={classNames("w-full mr-0.5", sectionClasses)} onClick={() => value !== undefined && toggleItem(value)}>

            <div className="w-full text-start">
                {label}
            </div>

            <SymbolChevronDown
                className={classNames("size-4 text-muted-foreground", isExpanded ? "rotate-0 transition-transform" : "-rotate-90 transition-transform")}
            />
        </Button>

        {/* <button
            className={classNames('group', className)}
            type='button'
            aria-expanded={isExpanded}
            {...(isExpanded ? { 'data-expanded': '' } : { 'data-closed': '' })}
            onClick={() => value !== undefined && toggleItem(value)}
        >
            {children}
        </button> */}
    </>);
}

export function OptionsSubSectionTitle({ label, formIdx, name }: { label: string; formIdx: FormIdx; name: string; }) {

    const open = useSnapshot(appSettings).right.mani.openInOptions[formIdx][name];

    function toggleOpen() {
        appSettings.right.mani.openInOptions[formIdx][name] = !appSettings.right.mani.openInOptions[formIdx][name];
    }

    return (
        <div className="col-span-1 w-full">
            <Button className={classNames("w-full mr-0.5", sectionClasses)} onClick={toggleOpen}>

                <div className="w-full text-start">
                    {label}
                </div>

                <SymbolChevronDown
                    className={classNames("size-4 text-muted-foreground", open ? "rotate-0 transition-transform" : "-rotate-90 transition-transform")}
                />
            </Button>
        </div>
    );
}

const sectionClasses = "\
col-span-2 \
\
1first:mt-1.5 mt-1 1mb-2 1pb-1 \
\
1text-sm \
font-normal \
1text-mani-title \
1bg-muted \
1border-mani-title \
border-border \
1border-t \
1border-b \
flex items-center gap-1 \
";
