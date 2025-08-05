import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Checkbox, Label } from "@ui/shadcn";
import { Order } from "@/store/store-types";

/* TBD: do not need it as it is now */

export function CheckSortBy() {
    const { order, sortBy } = useSnapshot(appSettings.files.sortOrder);
    return (
        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox
                    checked={order === Order.lowToHigh}
                    onCheckedChange={(v) => appSettings.files.sortOrder.order = v ? Order.lowToHigh : Order.highToLow}
                />
                Sort by
            </Label>
        </div>
    );
}

const labelBoldClasses = "block mb-1 text-xs font-semibold";
const subClasses = "py-1 flex flex-col gap-2";
const rowClasses = "text-xs font-normal flex place-items-center gap-1.5";
