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
        <div className="flex items-center gap-0.5">
            <span className="">Filter:</span>
            <span className="">{text}</span>
            <Button className="h-6" variant="ghost" onClick={() => setText('')}>
                <IconClose className="size-3" />
            </Button>
        </div>
    );
}
