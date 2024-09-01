import { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type ManualEditorState, type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { type MenuState, RowMenuButton } from "./4-row-popup-menu";
import { RowColumnDetails, RowColumnIcon, rowColumnName } from "./5-get-row-icon-and-details";
import { rowClasses, rowSelectedClasses } from "../8-manual-shared-styles";
import { classNames } from "@/utils";

type SingleRowProps = HTMLAttributes<HTMLDivElement> & {
    ctx: ManualEditorState.ScriptAtoms;
    chunk: ManualFieldState.ForAtoms;
    menuState: MenuState;
    idx: number;
};

const singleRowClasses = "py-0.5 grid grid-cols-[min-content,5rem,1fr,min-content] items-center";

export function SingleRow({ ctx, chunk, menuState, idx, ...rest }: SingleRowProps) {

    const isSelected = useAtomValue(chunk.selectedAtom);
    const dispText = rowColumnName(chunk.type);

    return (
        <div className={classNames(singleRowClasses, rowClasses, isSelected && rowSelectedClasses)} {...rest}>
            <RowColumnIcon type={chunk.type} />

            <div className="pl-3 pr-2 text-xs">
                {dispText}
            </div>

            <div className="px-4 text-[.65rem] font-light">
                <RowColumnDetails item={chunk} />
            </div>

            <RowMenuButton menuState={menuState} />
        </div>
    );
}
