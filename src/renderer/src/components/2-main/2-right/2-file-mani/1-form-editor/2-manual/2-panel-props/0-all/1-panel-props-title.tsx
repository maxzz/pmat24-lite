import { type ChunkKey } from "@/store/manifest";
import { panelEditorTitleClasses } from "../../8-manual-shared-styles";
import { chunkIconClasses, RowColumnIcon, rowColumnName } from "../../1-panel-actions/1-row-parts";
import { classNames } from "@/utils";

export function PanelPropsTitleBody({ type }: { type: ChunkKey; }) {
    const dispName = rowColumnName(type);

    const ending = dispName
        ? 'properties'
        : 'No action selected';

    return (<>
        <div>
            {dispName}
            <span className="text-xs font-light">
                {' '}{ending}
            </span>
        </div>

        <div className="opacity-50">
            <RowColumnIcon type={type} className={classNames(chunkIconClasses, "!opacity-100")} />
        </div>

    </>);
}

export function PanelPropsTitle({ type }: { type?: ChunkKey | undefined; }) {
    return (
        <div className="-mx-1 -mt-1">
            <div className={panelEditorTitleClasses}>
                {type && (
                    <PanelPropsTitleBody type={type} />
                )}
            </div>
        </div>
    );
}
