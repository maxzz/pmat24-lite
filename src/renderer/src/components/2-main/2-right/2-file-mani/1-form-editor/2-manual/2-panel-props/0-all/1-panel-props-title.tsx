import { type ChunkKey } from "@/store/manifest";
import { panelEditorTitleClasses } from "../../8-manual-shared-styles";
import { chunkIconClasses, RowColumnIcon, rowColumnActionName } from "../../1-panel-actions/3-row-details";
import { classNames } from "@/utils";

export function PanelPropsTitle({ type }: { type: ChunkKey; }) {
    return (
        <div className={classNames("-mx-1 -mt-1 pl-2 pr-3", panelEditorTitleClasses)}>
            <PanelPropsTitleBody type={type} />
        </div>
    );
}

function PanelPropsTitleBody({ type }: { type: ChunkKey; }) {
    const dispName = rowColumnActionName(type);
    return (<>
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
    </>);
}
