import { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { editorDataForAtom, ManualEditorState, type ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { MenuState, RowMenuButton } from "./4-row-popup-menu";
import { rowColumnDetails } from "./5-get-row-icon-and-details";
import { rowClasses, rowSelectedClasses } from "../8-shared-styles";
import { classNames } from "@/utils";
import { EditorDataForOne } from "@/store/manifest";

type SingleRowProps = HTMLAttributes<HTMLDivElement> & {
    ctx: ManualEditorState.ScriptAtoms;
    chunk: ManualFieldState.ForAtoms;
    menuState: MenuState;
    idx: number;
};

const singleRowClasses = "py-0.5 grid grid-cols-[min-content,5rem,1fr,min-content] items-center";

export function SingleRow({ ctx, chunk, menuState, idx, ...rest }: SingleRowProps) {

    const isSelected = useAtomValue(chunk.selectedAtom);
    const { icon, name, details } = rowColumnDetails(chunk);
    return (
        <div className={classNames(singleRowClasses, rowClasses, isSelected && rowSelectedClasses)} {...rest}>
            {icon}

            <div className="pl-3 pr-2 text-xs">
                {name}
            </div>

            <div className="px-4 text-[.65rem] font-light">
                {details}
            </div>

            <RowMenuButton menuState={menuState} />
        </div>
    );
}

// export function SingleRow({ ctx, chunk, menuState, idx, ...rest }: SingleRowProps) {

//     const isSelected = useAtomValue(chunk.selectedAtom);
//     const chunkData: EditorDataForOne = useAtomValue(editorDataForAtom)(chunk);
    
//     const { icon, name, details } = rowColumnDetails(chunkData);
//     return (
//         <div className={classNames(singleRowClasses, rowClasses, isSelected && rowSelectedClasses)} {...rest}>
//             {icon}

//             <div className="pl-3 pr-2 text-xs">
//                 {name}
//             </div>

//             <div className="px-4 text-[.65rem] font-light">
//                 {details}
//             </div>

//             <RowMenuButton menuState={menuState} />
//         </div>
//     );
// }
