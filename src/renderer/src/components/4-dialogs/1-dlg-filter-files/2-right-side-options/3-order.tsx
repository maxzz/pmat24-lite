import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Checkbox, Label } from "@ui/shadcn";
import { Order } from "@/store/store-types";
import { Dropdown5, SelectNameValueItem } from "@/ui";

const labelBoldClasses = "block mb-1 text-xs font-semibold";
const subClasses = "py-1 flex flex-col gap-2";
const rowClasses = "text-xs font-normal flex place-items-center gap-1.5";

export function CheckAscendingNun() {
    const { order } = useSnapshot(appSettings.files.sortOrder);
    return (
        <div className={subClasses}>
            <Label className={rowClasses}>
                <Checkbox
                    checked={order === Order.lowToHigh}
                    onCheckedChange={(v) => appSettings.files.sortOrder.order = v ? Order.lowToHigh : Order.highToLow}
                />
                Ascending
            </Label>
        </div>
    );
}

const orderItems: SelectNameValueItem[] = [
    ['Ascending', '0'],
    ['Descending', '1'],
];

export function CheckAscending() {
    const { order } = useSnapshot(appSettings.files.sortOrder);
    return (
        <div className={subClasses}>

            <Dropdown5 items={orderItems}
                value={order === Order.lowToHigh ? '0' : '1'}
                onValueChange={
                    (value) => {
                        console.log(value);
                        appSettings.files.sortOrder.order = value === '0' ? Order.lowToHigh : Order.highToLow;
                    }
                }
            />

            {/* <Label className={rowClasses}>

                {/* <Checkbox
                    checked={order === Order.lowToHigh}
                    onCheckedChange={(v) => appSettings.files.sortOrder.order = v ? Order.lowToHigh : Order.highToLow}
                />
                Ascending * /}
            </Label> */}
        </div>
    );
}
