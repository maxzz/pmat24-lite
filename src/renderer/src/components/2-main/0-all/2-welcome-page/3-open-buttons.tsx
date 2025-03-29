import { appSettings } from "@/store";
import { useSnapshot } from "valtio";
import { ButtonFilesPicker } from "./4-button-files-picker";
// import { ListViewDemo } from "@/ui/local-ui/nun/ai-listview/0-list-view-demo4";

export function OpenButtons() {
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);
    return (<>
        {allowHandleFiles && <ButtonFilesPicker className="bg-background" />}
        <ButtonFilesPicker openAsFolder className="bg-background" />
        {/* <ListViewDemo /> */}
    </>);
}

