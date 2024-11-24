import { useSnapshot } from "valtio";
import { appSettings, RightPanelViewType } from "@/store";
import { Button } from "@/ui";
import { SymbolCode } from "@/ui/icons";
import { classNames } from "@/utils";

export function ButtonAddItem() {

    return (
        <Button variant="ghost" className={classNames("-mr-4")} onClick={()=>{}}>
            <SymbolCode className="size-4 fill-current" />
        </Button>
    );
}
