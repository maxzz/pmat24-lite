import { useAtomValue } from "jotai";
import { fldCatItemsAtom } from "@/store";

const dlgHeaderClasses = 'my-1 text-xs font-thin text-primary-400 bg-primary-800';

export function Header() {
    const totalItems = useAtomValue(fldCatItemsAtom).length;
    return (
        <div className="pr-1 flex items-center justify-between">
            <div>Field Catalog</div>
            <div className={dlgHeaderClasses}>({totalItems} item{totalItems === 1 ? '' : 's'})</div>
        </div>
    );
}
