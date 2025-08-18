import { type ComponentType, forwardRef, type ForwardRefExoticComponent, type Ref, type RefAttributes, type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { motion, type MotionProps } from "motion/react";
import { type MFormProps, type ManualFieldState } from "@/store/2-file-mani-atoms";
import { type PopupMenuItemState, RowMenuButton } from "./5-row-popup-menu";
import { RowColumnDetails, RowColumnIcon, rowColumnActionName } from "../3-row-details";
import { classNames } from "@/utils";
import { rowSelectClasses } from "@/components/4-dialogs/4-dlg-field-catalog/3-items-grid/2-fld-cat-item-row";

function SingleRowWRef({ mFormProps, chunk, menuState, idx, ...rest }: SingleRowProps, ref: Ref<HTMLDivElement>) {
    const isSelected = useAtomValue(chunk.selectedAtom);
    const hasError = useAtomValue(chunk.hasErrorAtom);
    const dispText = rowColumnActionName(chunk.type);
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
                <RowColumnDetails ctx={chunk} mFormProps={mFormProps} />
            </div>

            <RowMenuButton menuState={menuState} />
        </div>
    );
}

const rowLocalClasses = "\
mx-1 py-px leading-6 \
grid grid-cols-[min-content_5rem_1fr_min-content] items-center \
\
text-foreground bg-background \
hover:text-accent-foreground hover:bg-muted \
cursor-pointer";
const rowClasses = `${rowLocalClasses} ${rowSelectClasses}`;

type SingleRowProps = HTMLAttributes<HTMLDivElement> & {
    mFormProps: MFormProps;
    chunk: ManualFieldState.Ctx;
    menuState: PopupMenuItemState;
    idx: number;
};

type SingleRowRefType = ForwardRefExoticComponent<Parameters<typeof SingleRowWRef>[0] & RefAttributes<HTMLDivElement>>;

// interface MyMotionComponentProps extends SingleRowRefType, MotionProps { }
// export const SingleRow = motion(forwardRef(SingleRowWRef)) as React.FC<MyMotionComponentProps>;

// interface MyMotionComponentProps extends SingleRowRefType, MotionProps { }
// export const SingleRow = motion.create(forwardRef(SingleRowWRef)) as React.FC<MyMotionComponentProps>;

// export const SingleRow = motion.create(forwardRef(SingleRowWRef)) as React.FC<SingleRowRefType & MotionProps>;

// export const SingleRow = motion.create(forwardRef(SingleRowWRef)) as React.FC<SingleRowRefType & MotionProps>;

// export const SingleRow = motion.create(forwardRef(SingleRowWRef)) as SingleRowRefType & MotionProps;

// interface MyMotionComponentProps extends SingleRowRefType, MotionProps {}
// export const SingleRow = motion.create(forwardRef(SingleRowWRef)) as MyMotionComponentProps;

export const SingleRow = motion.create(forwardRef(SingleRowWRef)) as SingleRowRefType & MotionProps;