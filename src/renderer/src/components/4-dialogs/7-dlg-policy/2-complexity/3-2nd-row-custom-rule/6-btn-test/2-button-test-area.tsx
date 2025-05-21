import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { SymbolChevronDown } from "@/ui/icons";
import { classNames } from "@/utils";
import { appSettings } from "@/store";

export const inlineButtonClasses = "h-6 bg-background active:scale-[.97] cursor-pointer";

export function ButtonTestArea() {
    const open = appSettings.right.mani;
    const { openTestArea } = useSnapshot(open);
    return (
        <Button
            className={classNames(inlineButtonClasses, "px-2 space-x-0.5")}
            size="xs"
            onClick={() => open.openTestArea = !open.openTestArea}
        >
            <span>
                Test area
            </span>
            <SymbolChevronDown className={classNames("size-3 transition-all", openTestArea && "rotate-180")} />
        </Button>
    );
}
