import { type ChunkKey } from "@/store/manifest";
import { classNames } from "@/utils";
import { panelEditorTitleClasses } from "../../8-manual-shared-styles";
import { chunkIconClasses, RowColumnIcon, rowColumnActionName } from "../../1-panel-actions/3-row-details";

export function PanelPropsTitle({ type }: { type: ChunkKey; }) {
    const dispName = rowColumnActionName(type);
    return (
        <div className={classNames("-mx-1 -mt-1 pl-2 pr-3", panelEditorTitleClasses)}>
            <div className="text-xs font-light">
                Action{' '}
                <span className="font-semibold opacity-50">
                    {dispName}
                </span>
                {' '}properties
            </div>

            <div className="opacity-50">
                <RowColumnIcon type={type} className={classNames(chunkIconClasses, "!opacity-100")} />
            </div>
        </div>
    );
}
