import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { ButtonFilesPicker } from "@/components/2-main/0-all/2-welcome-page/4-button-files-picker";

export function TestOpenFiles() {
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);
    return (<>
        {allowHandleFiles &&
            <ButtonFilesPicker className="text-[.65rem]" />
        }
        <ButtonFilesPicker className="text-[.65rem]" openAsFolder />
    </>);
}
