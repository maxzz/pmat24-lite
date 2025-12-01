import { useSnapshot } from "valtio";
import { appSettings } from "@/store/9-ui-state";
import { Order } from "@/store/store-types";
import { type SelectTmTextValue, SelectTm } from "@/ui/local-ui";

export function CheckAscending() {
    const { order } = useSnapshot(appSettings.files.sortOrder);
    return (
        <SelectTm items={orderItems}
            value={order === Order.lowToHigh ? '0' : '1'}
            onValueChange={
                (value) => appSettings.files.sortOrder.order = value === '0' ? Order.lowToHigh : Order.highToLow
            }
        />
    );
}

const orderItems: SelectTmTextValue[] = [
    ['Ascending', '0'],
    ['Descending', '1'],
];
