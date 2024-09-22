import { forwardRef, Ref, type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type MFormCtx, type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { type MenuState, RowMenuButton } from "./4-row-popup-menu";
import { RowColumnDetails, RowColumnIcon, rowColumnName } from "./1-row-parts";
import { rowClasses, rowSelectedClasses } from "../8-manual-shared-styles";
import { classNames } from "@/utils";
import { motion } from "framer-motion";

type SingleRowProps = HTMLAttributes<HTMLDivElement> & {
    formCtx: MFormCtx;
    chunk: ManualFieldState.Ctx;
    menuState: MenuState;
    idx: number;
};

const singleRowClasses = "py-0.5 grid grid-cols-[min-content,5rem,1fr,min-content] items-center";

function SingleRowWRef({ formCtx, chunk, menuState, idx, ...rest }: SingleRowProps, ref: Ref<HTMLDivElement>) {

    const isSelected = useAtomValue(chunk.selectedAtom);
    const hasError = useAtomValue(chunk.hasErrorAtom);
    const dispText = rowColumnName(chunk.type);
    const title = hasError ? "This row has errors" : undefined;

    return (
        <div ref={ref} {...rest}>
            <div className={classNames(singleRowClasses, rowClasses, isSelected && rowSelectedClasses, hasError && "text-red-500 font-semibold")} title={title}>
                <RowColumnIcon type={chunk.type} />

                <div className="pl-3 pr-2 text-xs">
                    {dispText}
                </div>

                <div className="px-4 text-[.65rem] font-light">
                    <RowColumnDetails ctx={chunk} />
                </div>

                <RowMenuButton menuState={menuState} />
            </div>
        </div>
    );
}

export const SingleRow = motion.create(forwardRef(SingleRowWRef));
