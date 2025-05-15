import { L_PanelHeader } from "../1-header/0-all-header";
import { FilesTreeView, FilesTreeViewcontextMenu } from "../2-files-list";
import { panel1Classes, panel2Classes, panel3Classes } from "../../0-all/1-working-area/3-shared-classes";

export function PanelA() {
    return (
        <div className={`${panel1Classes} pr-0`}>
            <div className={`${panel2Classes} rounded-l`}>
                <div className={panel3Classes}>
                    <L_PanelHeader />

                    <FilesTreeViewcontextMenu>
                        <FilesTreeView />
                    </FilesTreeViewcontextMenu>
                </div>
            </div>
        </div>
    );
}
