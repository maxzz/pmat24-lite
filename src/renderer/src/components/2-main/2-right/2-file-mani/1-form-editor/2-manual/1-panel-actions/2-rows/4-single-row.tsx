import { type ComponentType, forwardRef, type ForwardRefExoticComponent, type Ref, type RefAttributes, type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { motion, MotionProps } from "motion/react";
import { type MFormProps, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { type MenuState, RowMenuButton } from "./5-row-popup-menu";
import { RowColumnDetails, RowColumnIcon, rowColumnName } from "../3-row-details";
import { classNames } from "@/utils";
import { rowSelectClasses } from "@/components/4-dialogs/4-dlg-field-catalog/3-items-grid/2-fld-cat-item-row";

function SingleRowWRef({ mFormProps, chunk, menuState, idx, ...rest }: SingleRowProps, ref: Ref<HTMLDivElement>) {

    const isSelected = useAtomValue(chunk.selectedAtom);
    const hasError = useAtomValue(chunk.hasErrorAtom);
    const dispText = rowColumnName(chunk.type);
    const title = hasError ? "This row has errors" : undefined;

    return (
        <div
            ref={ref}
            data-list-item={isSelected ? 'selected' : ''}
            className={classNames(rowClasses, hasError && "text-red-500 font-semibold")}
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

const rowLocalClasses = "\
mx-1 py-px leading-6 \
grid grid-cols-[min-content,5rem,1fr,min-content] items-center \
\
text-foreground bg-background \
hover:text-accent-foreground hover:bg-muted \
cursor-pointer";
const rowClasses = `${rowLocalClasses} ${rowSelectClasses}`;

type SingleRowProps = HTMLAttributes<HTMLDivElement> & {
    mFormProps: MFormProps
    chunk: ManualFieldState.Ctx;
    menuState: MenuState;
    idx: number;
};

type SingleRowRefType = ForwardRefExoticComponent<Parameters<typeof SingleRowWRef>[0] & RefAttributes<HTMLDivElement>>;

export const SingleRow = motion.create(forwardRef(SingleRowWRef)) as unknown as SingleRowRefType & MotionProps;
