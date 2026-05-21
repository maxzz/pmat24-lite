import { type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/9-ui-state";
import { classNames } from "@/utils";
import { type Variants, AnimatePresence, motion } from "motion/react";
import { type OptionInputWTypeProps, OptionAsCheckbox, OptionAsString, OptionAsTextarea } from "@/ui/local-ui";
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from "@/ui/shadcn/tooltip";
import { SymbolInfo } from "@/ui/icons";

export function ChildrenWithLabel2Cols({ label, children, containerClasses, titleTooltip }: { label: ReactNode; children: ReactNode; containerClasses?: string; titleTooltip?: string; }) {
    return (
        <FormRowChildren label={label} titleTooltip={titleTooltip} className={classNames(children2ColsClasses, containerClasses)} labelClasses={label2ColsClasses}>
            {children}
        </FormRowChildren>
    );
}

export function InputWithTitle2Cols({ label, containerClasses, labelClasses, titleTooltip, ...rest }: { label: ReactNode; titleTooltip?: string; } & OptionInputWTypeProps) {
    return (
        <FormRowChildren label={label} titleTooltip={titleTooltip} className={classNames(children2ColsClasses, containerClasses)} labelClasses={classNames(label2ColsClasses, labelClasses)}>
            <InputOrCheckWithErrorMsg {...rest} />
        </FormRowChildren>
    );
}

export function InputWithTitle2Rows({ label, containerClasses, labelClasses, titleTooltip, ...rest }: { label: ReactNode; titleTooltip?: string; } & OptionInputWTypeProps) {
    return (
        <FormRowChildren label={label} titleTooltip={titleTooltip} className={classNames(children2RowsClasses, containerClasses)} labelClasses={classNames(label2RowsClasses, labelClasses)}>
            <InputOrCheckWithErrorMsg twoRows {...rest} />
        </FormRowChildren>
    );
}

// Row input with error message

export function InputOrCheckWithErrorMsg({ stateAtom, asCheckbox, asTextarea, className, twoRows, checkboxTrail, ...rest }: OptionInputWTypeProps) {
    const state = useAtomValue(stateAtom);
    const hasError = state.error && state.touched;
    const errorInputClasses = classNames(hasError && 'outline-offset-0 outline-red-500', className);
    return (<>
        {asCheckbox
            ? (<>
                {checkboxTrail
                    ? (
                        <div className="flex items-center">
                            <OptionAsCheckbox stateAtom={stateAtom} className={errorInputClasses} {...rest} />
                            {checkboxTrail}

                        </div>
                    )
                    : <OptionAsCheckbox stateAtom={stateAtom} className={errorInputClasses} {...rest} />}
            </>)
            : asTextarea
                ? <OptionAsTextarea stateAtom={stateAtom} className={errorInputClasses} {...rest} />
                : <OptionAsString stateAtom={stateAtom} className={errorInputClasses} {...rest} />
        }

        <InputErrorPopupMessage hasError={!!hasError} error={state.error} errorClasses={twoRows ? '' : "col-start-2"} />
    </>);
}

export function InputErrorPopupMessage({ hasError, error, errorClasses }: { hasError: boolean | undefined | ''; error: string | undefined; errorClasses?: string; }) {
    return (
        <InputPopupMessage show={hasError} message={error} messageClasses={classNames("text-[0.65rem] text-red-500", errorClasses)} />
    );
}

export function InputPopupMessage({ show, message, messageClasses }: { show: boolean | undefined | ''; message: ReactNode; messageClasses?: string; }) {
    return (
        <AnimatePresence initial={false}>
            {show && (
                <motion.div className={messageClasses} variants={variants} initial='collapsed' animate='expanded' exit='collapsed'>
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const variants: Variants = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
};

export function TitleTooltip({ content }: { content?: string }) {
    const { showTooltipIcons } = useSnapshot(appSettings.appUi.uiGeneral);
    if (!content || !showTooltipIcons) {
        return null;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <SymbolInfo className="size-3 text-foreground/40" />
            </TooltipTrigger>
            <TooltipPortal>
                <TooltipContent className={titleTooltipContentClasses} sideOffset={10}>
                    {content}
                </TooltipContent>
            </TooltipPortal>
        </Tooltip>
    );
}

const titleTooltipContentClasses = "mx-[18px] py-2 max-w-80 text-xs text-foreground/75 bg-background border-border border shadow-sm";

// Row with children simle DOM layout

export function FormRowChildren({ label, children, className, labelClasses, titleTooltip }: { label: ReactNode; children: ReactNode; className?: string; labelClasses?: string; titleTooltip?: string; }) {
    const { showTooltipIcons } = useSnapshot(appSettings.appUi.uiGeneral);
    const hasTitleTooltip = !!(titleTooltip && showTooltipIcons);
    return (
        <div className={className}>
            <div className={classNames(labelClasses, hasTitleTooltip && "inline-flex items-center gap-1")}>
                {label}
                <TitleTooltip content={titleTooltip} />
            </div>

            {children}
        </div>
    );
}

const children2RowsClasses = "col-span-2 py-1 text-xs grid gap-0.5";
const label2RowsClasses = "font-light";

const children2ColsClasses = "col-span-2 py-1 pr-0.5 text-xs grid grid-cols-subgrid items-center";
const label2ColsClasses = "font-light text-end";

export const SubSubGridClasses = "col-span-2 grid grid-cols-subgrid";
