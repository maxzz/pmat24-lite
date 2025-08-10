import { useAtom } from "jotai";
import { Button } from "@/ui/shadcn";
import { SymbolDoubleDown } from "@/ui/icons";
import { showPropsAtom } from "@/store/1-atoms/4-field-catalogs";

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
