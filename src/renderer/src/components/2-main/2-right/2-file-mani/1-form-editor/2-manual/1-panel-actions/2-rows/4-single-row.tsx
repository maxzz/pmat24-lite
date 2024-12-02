import { forwardRef, Ref, type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { motion } from "framer-motion";
import { type MFormCtx, type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { type MenuState, RowMenuButton } from "./5-row-popup-menu";
import { RowColumnDetails, RowColumnIcon, rowColumnName } from "../3-row-details";
import { classNames } from "@/utils";

type SingleRowProps = HTMLAttributes<HTMLDivElement> & {
    formCtx: MFormCtx;
    chunk: ManualFieldState.Ctx;
    menuState: MenuState;
    idx: number;
};

const rowClasses = "\
py-0.5 leading-6 \
grid grid-cols-[min-content,5rem,1fr,min-content] items-center \
\
text-foreground bg-background \
hover:text-accent-foreground hover:bg-muted \
\
1hover:bg-primary-200/30 1dark:hover:bg-primary-800/40 \
";

const rowSelectedClasses = "\
data-[list-item=selected]:text-[var(--selected-fg)] hover:data-[list-item=selected]:text-[var(--selected-fg)] \
data-[list-item=selected]:bg-[var(--parent-selected-bg)] hover:data-[list-item=selected]:bg-[var(--parent-selected-bg)] \
\
data-[list-item=selected]:outline \
data-[list-item=selected]:[outline-width:calc(var(--parent-active)_*_1px)] \
data-[list-item=selected]:[outline-offset:-2px] \
outline-[var(--selected-outline)] \
rounded-[3px] \
";

const rowSelectedClasses0 = "\
text-primary-800 dark:text-primary-200 \
\
bg-primary-400/20 dark:bg-primary-400/20 \
hover:!bg-primary-400/30 \
\
outline-primary-400 \
[outline-width:calc(var(--parent-active)_*_1px)] \
outline rounded-[3px] \
\
cursor-default";

function SingleRowWRef({ formCtx, chunk, menuState, idx, ...rest }: SingleRowProps, ref: Ref<HTMLDivElement>) {

    const isSelected = useAtomValue(chunk.selectedAtom);
    const hasError = useAtomValue(chunk.hasErrorAtom);
    const dispText = rowColumnName(chunk.type);
    const title = hasError ? "This row has errors" : undefined;

    return (
        <div
            ref={ref}
            data-list-item={isSelected ? 'selected' : ''}
            className={classNames(rowClasses, isSelected && rowSelectedClasses, hasError && "text-red-500 font-semibold")}
            title={title}
            {...rest}
        >
            <RowColumnIcon type={chunk.type} />

            <div className="pl-3 pr-2 text-xs">
                {dispText}
            </div>

            <div className="px-4 text-[.65rem] font-light">
                <RowColumnDetails ctx={chunk} />
            </div>

            <RowMenuButton menuState={menuState} />
        </div>
    );
}

export const SingleRow = motion.create(forwardRef(SingleRowWRef));
