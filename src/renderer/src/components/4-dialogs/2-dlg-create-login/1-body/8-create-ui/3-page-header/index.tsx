import { useSnapshot } from "valtio";
import { debugSettings } from "@/store";
import { WizardPage, stepInfo } from "../../0-new-mani-ctx";
import { Button } from "@/ui";
import { SymbolCode } from "@/ui/icons";

export function WizardPageHeader({ page }: { page: WizardPage; }) {
    const [title, explanation] = stepInfo[page];
    const showSourceCode = useSnapshot(debugSettings.debugOnly).showCreateSourceCode;
    return (
        <div className="px-3 py-3 text-sm bg-muted/30 flex items-center justify-between gap-0.5">

            <div className="flex flex-col gap-0.5">
                <div className="text-xs font-semibold">{title}</div>
                <div className="text-xs text-foreground/50">{explanation}</div>
            </div>

            {page === WizardPage.fields && showSourceCode && (
                <Button
                    className="1absolute right-4 top-0.5 active:scale-y-95 z-10" variant="outline"
                    onClick={() => {}}
                >
                    <SymbolCode className="size-4" />
                </Button>
            )}
        </div>
    );
}
