import { useSnapshot } from "valtio";
import { appSettings } from "@/store/9-ui-state";
import { Input, Label } from "@/ui";
import { rowClasses } from "./8-shared-classes";

export function DialogPasswordPolicy() {
    const snapMani = useSnapshot(appSettings, { sync: true }).right.mani;
    return (<>
        <Label className={rowClasses}>
            Number of generated passwords
            <Input className="h-6 px-0 max-w-10 text-xs text-center" value={snapMani.nToGenerate} onChange={(e) => appSettings.right.mani.nToGenerate = +e.target.value} />
        </Label>
    </>);
}
