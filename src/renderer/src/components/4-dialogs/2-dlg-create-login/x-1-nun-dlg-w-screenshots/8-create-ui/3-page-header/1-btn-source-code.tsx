import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { SymbolCode } from "@/ui/icons";
import { debugSettings } from "@/store/9-ui-state";

export function ButtonSourceCode() {
    const { showCreateSrcCodeBtn, showCreateSrcCode } = useSnapshot(debugSettings.debugOnly);
    return (<>
        {showCreateSrcCodeBtn && (
            <Button
                className="1absolute right-4 top-0.5 active:scale-y-95 z-10" variant="outline" tabIndex={-1}
                onClick={() => debugSettings.debugOnly.showCreateSrcCode = !showCreateSrcCode}
            >
                <SymbolCode className="size-4" />
            </Button>
        )}
    </>);
}
