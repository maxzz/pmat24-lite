import { useSnapshot } from "valtio";
import { SrcriptItemKey } from "@/store";
import { InputField } from "../../ui";
import { plural } from "@/utils";

export function InputRepeat({ item }: { item: SrcriptItemKey; }) {
    const snap = useSnapshot(item, { sync: true });
    return (
        <div className="flex items-end space-x-1">
            <InputField className="w-10" labelClasses="min-w-[9ch]" label="Repeat" horizontal
                value={`${snap.repeat}`}
                onChange={(e) => {
                    let n = parseInt(e.target.value);
                    if (Number.isNaN(n)) {
                        n = 1;
                    }
                    item.repeat = n;
                }} />
            <div className="pb-1">{`${plural(item.repeat, 'time')}`}</div>
        </div>
    );
}
