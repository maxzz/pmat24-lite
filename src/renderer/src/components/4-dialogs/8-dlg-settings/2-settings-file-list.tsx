import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings, debugSettings } from "@/store/9-ui-state";
import { Checkbox, Label } from "@/ui";
import { subClasses, rowClasses } from "./8-shared-classes";

export function FileListSettings() {
    const { debugAccess } = useSnapshot(debugSettings.debugOnly);
    const { showFname, showChosen, showIeMarker, showIndex, selectAsTrigger, selectEmptySpace, showCpassMarker } = useSnapshot(appSettings.files.itemsState);
    const liveItems = appSettings.files.itemsState;
    return (
        <div className={subClasses}>

            <Label className={classNames(rowClasses, showFname && "opacity-30 pointer-events-none")}>
                <Checkbox checked={showChosen} onCheckedChange={(v) => liveItems.showChosen = !!v} />
                Show user defined template name instead of login domain name
            </Label>

            <Label className={rowClasses}>
                <Checkbox checked={showFname} onCheckedChange={(v) => liveItems.showFname = !!v} />
                Always show template file name
            </Label>

            <Label className={rowClasses}>
                <Checkbox checked={showIeMarker} onCheckedChange={(v) => liveItems.showIeMarker = !!v} />
                Show warning icon for Internet Explorer templates
            </Label>

            <Label className={rowClasses}>
                <Checkbox checked={showIndex} onCheckedChange={(v) => liveItems.showIndex = !!v} />
                Show template file index
            </Label>

            {debugAccess && (<>
                <Label className={rowClasses}>
                    <Checkbox checked={showCpassMarker} onCheckedChange={(v) => liveItems.showCpassMarker = !!v} />
                    Show Password Change marker on tree items
                </Label>

                <Label className={rowClasses}>
                    <Checkbox checked={selectAsTrigger} onCheckedChange={(v) => liveItems.selectAsTrigger = !!v} />
                    Select the same file will deselect it
                </Label>

                <Label className={rowClasses}>
                    <Checkbox checked={selectEmptySpace} onCheckedChange={(v) => liveItems.selectEmptySpace = !!v} />
                    Empty space click will deselect current item
                </Label>
            </>)}
        </div>
    );
}
