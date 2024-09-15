import { appSettings } from "@/store";
import { FileUs } from "@/store/store-types";
import { formToAppTypeIcons } from "@/store/store-utils";
import { useSnapshot } from "valtio";

export function ManiAppIcons({ fileUs }: { fileUs: FileUs; }) {

    const showIeWranIcon = useSnapshot(appSettings).files.itemsState.showIeMarker;
    const Icons = formToAppTypeIcons(fileUs, showIeWranIcon);

    return (
        <div className="flex items-center gap-1">
            {Icons.map(
                (Icon, idx) => {
                    const title = Icons.length === 2
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
