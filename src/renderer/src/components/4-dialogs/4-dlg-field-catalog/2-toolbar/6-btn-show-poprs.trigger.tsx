import { useAtom } from "jotai";
import { Button } from "@/ui/shadcn";
import { SymbolDoubleDown } from "@/ui/icons";
import { showPropsAtom } from "@/components/4-dialogs/4-dlg-field-catalog/a-field-catalog-atoms";

export function ShowPropsTrigger({ showPropsExpand }: { showPropsExpand?: boolean; }) {
    const [showProps, doShowProps] = useAtom(showPropsAtom);
    return (<>
        {showPropsExpand && (
            <Button variant="ghost" tabIndex={-1} title="Show item details" onClick={() => doShowProps((v) => !v)}>
                <SymbolDoubleDown className={`size-3 ${showProps ? 'rotate-90' : '-rotate-90'} transition-transform duration-200`} />
            </Button>
        )}
    </>);
}
