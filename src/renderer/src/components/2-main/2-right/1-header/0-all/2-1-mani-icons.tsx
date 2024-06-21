import { FileUs } from "@/store/store-types";
import { formToAppTypeIcons } from "@/store/store-utils";

export function ManiAppIcons({ fileUs }: { fileUs: FileUs; }) {
    const Icons = formToAppTypeIcons(fileUs);
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
