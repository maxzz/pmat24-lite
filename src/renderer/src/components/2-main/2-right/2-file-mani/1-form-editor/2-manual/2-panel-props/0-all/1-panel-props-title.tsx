import { type ChunkKey } from "@/store/manifest";
import { getRowIconAndText } from "../../1-panel-actions/6-get-row-icon-and-text";
import { panelEditorTitleClasses } from "../../8-manual-shared-styles";

export function PanelPropsTitle({ type }: { type?: ChunkKey | undefined; }) {

    const { name, icon } = getRowIconAndText(type);
    const ending = name
        ? 'properties'
        : 'No action selected';

    return (
        <div className="-mx-1 -mt-1">
            <div className={panelEditorTitleClasses}>

                <div>
                    {name}{' '}
                    <span className="text-xs font-light">
                        {ending}
                    </span>
                </div>

                <div className="opacity-50">
                    {icon}
                </div>

            </div>
        </div>
    );
}
