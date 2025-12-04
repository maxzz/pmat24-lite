import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { IconTestTube, SymbolChevronDown } from "@/ui/icons";
import { classNames } from "@/utils";
import { appSettings } from "@/store/9-ui-state";
import { inlineButtonClasses } from "../8-inline-styles";

export function ButtonRulesHistory() {
    const open = appSettings.right.mani;
    const { openTestArea } = useSnapshot(open);
    return (
        <Button
            className={classNames(inlineButtonClasses, "px-1 space-x-0.5", openTestArea && "bg-muted border-muted-foreground/20 ")}
            size="xs"
            onClick={() => open.openTestArea = !open.openTestArea}
            title="Rules history"
        >
                {/* <IconTestTube className="size-3" /> */}
            <SymbolChevronDown className={classNames("size-3 transition-all", openTestArea && "rotate-180")} />
        </Button>
    );
}
