import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { SymbolChevronDown } from "@/ui/icons";
import { classNames } from "@/utils";
import { appSettings } from "@/store/9-ui-state";
import { inlineButtonClasses } from "../8-inline-styles";

export function ButtonTestArea() {
    const open = appSettings.right.mani;
    const { openTestArea } = useSnapshot(open);
    return (
        <Button
            className={classNames(inlineButtonClasses, "px-1 space-x-0.5")}
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
