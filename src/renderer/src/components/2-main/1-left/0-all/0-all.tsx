import { L_PanelHeader } from "../1-header/0-all-header";
import { FilesTreeView } from "../2-files-list";
import { panel1Classes, panel2Classes, panel3Classes } from "../../0-all/1-working-area/3-middle/shared-classes";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuTrigger } from "@/ui/shadcn";

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

// export function PanelA() {
//     return (
//         <div className={`${panel1Classes} pr-0`}>
//             <div className={`${panel2Classes} rounded-l`}>
//                 <div className={panel3Classes}>
//                     <L_PanelHeader />

//                     <FilesTreeView />
//                 </div>
//             </div>
//         </div>
//     );
// }

//05.12.25
//TODO: get tree item under cursor and show context menu

function FilesTreeViewcontextMenu({children}: { children: React.ReactNode; }) {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div className="">
                    {children}
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuLabel className="text-xs">File</ContextMenuLabel>
                <ContextMenuItem className="text-xs">Reveal in File Explorer</ContextMenuItem>
                <ContextMenuItem className="text-xs">Delete</ContextMenuItem>
                <ContextMenuItem className="text-xs">Rename</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
