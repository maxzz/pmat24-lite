import { useSnapshot } from "valtio";
import { appSettings } from "@/store/9-ui-state";
import { type FileUs } from "@/store/store-types";
import { getRightHeaderIcons } from "@/store/store-utils";

export function Row2_AppIcons({ fileUs }: { fileUs: FileUs; }) {
    const showIeWranIcon = useSnapshot(appSettings).files.itemsState.showIeMarker;

    const Icons = getRightHeaderIcons(fileUs, showIeWranIcon);

    return (
        <div className="flex items-center gap-1">
            {Icons.map(
                (Icon, idx) => {
                    const title =
                        Icons.length === 2
                            ? !idx
                                ? "Login form"
                                : "Password change form"
                            : undefined;
                    return (
                        <Icon key={idx} className="size-4" title={title} />
                    );
                }
            )}
        </div>
    );
}
