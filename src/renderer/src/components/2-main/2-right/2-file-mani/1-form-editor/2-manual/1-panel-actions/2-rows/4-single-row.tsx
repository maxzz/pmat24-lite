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

const singleRowClasses = "py-0.5 grid grid-cols-[min-content,5rem,1fr,min-content] items-center";

export const rowParentActiveClasses = "[--parent-active:0] focus-within:[--parent-active:1]";

export const rowClasses = "\
leading-6 \
hover:bg-primary-200/30 dark:hover:bg-primary-800/40";

export const rowSelectedClasses = "\
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
        <div ref={ref} className={classNames(singleRowClasses, rowClasses, isSelected && rowSelectedClasses, hasError && "text-red-500 font-semibold")} title={title} {...rest}>
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
