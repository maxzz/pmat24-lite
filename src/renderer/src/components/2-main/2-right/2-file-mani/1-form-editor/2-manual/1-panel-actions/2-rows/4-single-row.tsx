import { type ComponentType, forwardRef, type ForwardRefExoticComponent, type Ref, type RefAttributes, type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { motion } from "motion/react";
import { type MFormCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { type MenuState, RowMenuButton } from "./5-row-popup-menu";
import { RowColumnDetails, RowColumnIcon, rowColumnName } from "../3-row-details";
import { classNames } from "@/utils";
import { rowSelectClasses } from "@/components/4-dialogs/4-dlg-field-catalog/3-items-grid/2-fld-cat-item-row";

type SingleRowProps = HTMLAttributes<HTMLDivElement> & {
    formCtx: MFormCtx;
    chunk: ManualFieldState.Ctx;
    menuState: MenuState;
    idx: number;
};

function SingleRowWRef({ formCtx, chunk, menuState, idx, ...rest }: SingleRowProps, ref: Ref<HTMLDivElement>) {

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

//type SingleRowRefType = typeof SingleRow;
// type SingleRowRefType = ForwardRefExoticComponent<Omit<Parameters<typeof SingleRowWRef>, "ref"> & RefAttributes<HTMLDivElement>>;
type SingleRowRefType = ForwardRefExoticComponent<Parameters<typeof SingleRowWRef>[0] & RefAttributes<HTMLDivElement>>;
// type SingleRowRefType = ComponentType<MotionComponentProps<Parameters<typeof SingleRowWRef>[0]> & RefAttributes<HTMLDivElement>>;

// type Check = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>
//ComponentType<Omit<MotionComponentProps<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>

const cc: SingleRowRefType = forwardRef(SingleRowWRef);
export const SingleRow: any = motion.create(cc);
// export const SingleRow = motion.create(forwardRef(SingleRowWRef));

const rowLocalClasses = "\
mx-1 py-px leading-6 \
grid grid-cols-[min-content,5rem,1fr,min-content] items-center \
\
text-foreground bg-background \
hover:text-accent-foreground hover:bg-muted \
cursor-pointer";

const rowClasses = `${rowLocalClasses} ${rowSelectClasses}`;
