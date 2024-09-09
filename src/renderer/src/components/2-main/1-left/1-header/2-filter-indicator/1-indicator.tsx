import { useAtom, useAtomValue } from "jotai";
import { searchFilterData } from "@/store";
import { IconClose } from "@/ui/icons";
import { Button } from "@/ui";

export function CurrentFilter() {
    const [text, setText] = useAtom(searchFilterData.textAtom);
    if (!text) {
        return null;
    }
    return (
        <Button className="h-6" variant="ghost" onClick={() => setText('')}>
            <div className="px-2 border-border border rounded flex items-center gap-0.5">
                <span>Filter:</span>
                <span>{text}</span>
                <IconClose className="size-3" />
            </div>
        </Button >
    );
}
