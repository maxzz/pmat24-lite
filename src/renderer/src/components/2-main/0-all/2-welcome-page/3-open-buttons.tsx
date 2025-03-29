import { appSettings } from "@/store";
import { useSnapshot } from "valtio";
import { ButtonFilesPicker } from "./4-button-files-picker";

const buttonClasses = "bg-background active:scale-[0.95] transition-transform";

export function OpenButtons() {
    const { allowHandleFiles } = useSnapshot(appSettings.appUi.uiAdvanced);
    return (<>
        {allowHandleFiles && (
            <ButtonFilesPicker className={buttonClasses} />
        )}

        <ButtonFilesPicker openAsFolder className={buttonClasses} />
    </>);
}
