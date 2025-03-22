import { appSettings } from "@/store";
import { useSnapshot } from "valtio";
import { ButtonFilesPicker } from "./4-button-files-picker";
import { ListViewDemo } from "@/ui/local-ui/nun/ai-listview/0-list-view-demo4";

export function OpenButtons() {
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);
    return (<>
        {allowHandleFiles && <ButtonFilesPicker />}
        <ButtonFilesPicker openAsFolder />

        <RecentFilesList />
    </>);
}

function RecentFilesList() {
    const hasRecent = false;
    return (<>
        {hasRecent && (
            <div className="text-xs space-y-1">
                <div className="font-semibold">
                    Resently used folders:
                </div>
                <div className="">
                    Folder 1 (placeholder)
                </div>
                <div className="">
                    Folder 2 (placeholder)
                </div>
            </div>
        )}

        {/* <ListViewDemo /> */}
    </>);
}
