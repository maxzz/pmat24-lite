import { type ChunkKey } from "@/store/manifest";
import { panelEditorTitleClasses } from "../../8-manual-shared-styles";
import { chunkIconClasses, RowColumnIcon, rowColumnName } from "../../1-panel-actions/3-row-details";
import { classNames } from "@/utils";

export function PanelPropsTitle({ type }: { type: ChunkKey; }) {
    return (
        <div className={classNames("-mx-1 -mt-1", panelEditorTitleClasses)}>
            <PanelPropsTitleBody type={type} />
        </div>
    );
}

function PanelPropsTitleBody({ type }: { type: ChunkKey; }) {
    const dispName = rowColumnName(type);
    return (<>
        <div>
            {dispName}
            <span className="text-xs font-light">
                {' '}properties
            </span>
        </div>

        <div className="opacity-50">
            <RowColumnIcon type={type} className={classNames(chunkIconClasses, "!opacity-100")} />
        </div>
    </>);
}
