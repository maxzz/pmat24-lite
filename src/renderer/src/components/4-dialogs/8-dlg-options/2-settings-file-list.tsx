import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store/9-ui-state";
import { Checkbox, Label } from "@/ui";
import { subClasses, rowClasses } from "./8-shared-classes";

export function FileListSettings() {
    const snapItems = useSnapshot(appSettings.files).itemsState;
    const liveItems = appSettings.files.itemsState;
    return (
        <div className={subClasses}>

            <Label className={classNames(rowClasses, snapItems.showFname && "opacity-30 pointer-events-none")}>
                <Checkbox checked={snapItems.showChosen} onCheckedChange={(v) => liveItems.showChosen = !!v} />
                Show user defined name instead of domain name
            </Label>

            <Label className={rowClasses}>
                <Checkbox checked={snapItems.showFname} onCheckedChange={(v) => liveItems.showFname = !!v} />
                Show always file name
            </Label>

            <Label className={rowClasses}>
                <Checkbox checked={snapItems.showIeMarker} onCheckedChange={(v) => liveItems.showIeMarker = !!v} />
                Show IE warning icon
            </Label>

            <Label className={rowClasses}>
                <Checkbox checked={snapItems.showIndex} onCheckedChange={(v) => liveItems.showIndex = !!v} />
                Show file index
            </Label>

            <Label className={rowClasses}>
                <Checkbox checked={snapItems.showCpassMarker} onCheckedChange={(v) => liveItems.showCpassMarker = !!v} />
                Show Password Change marker on tree items
            </Label>

            <Label className={rowClasses}>
                <Checkbox checked={snapItems.selectAsTrigger} onCheckedChange={(v) => liveItems.selectAsTrigger = !!v} />
                Select the same file will deselect it
            </Label>

            <Label className={rowClasses}>
                <Checkbox checked={snapItems.selectEmptySpace} onCheckedChange={(v) => liveItems.selectEmptySpace = !!v} />
                Empty space click will deselect current item
            </Label>
        </div>
    );
}
