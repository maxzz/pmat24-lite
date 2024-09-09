import { useAtom } from "jotai";
import { searchFilterData } from "@/store";
import { IconClose } from "@/ui/icons";
import { Button } from "@/ui";

export function CurrentFilter() {
    const [text, setText] = useAtom(searchFilterData.textAtom);
    if (!text) {
        return null;
    }
    return (<>
        Filter:
        <Button className="flex-1 h-6 max-w-[20%] truncate" variant="outline" onClick={() => setText('')}>
            {text}
            <IconClose className="ml-1 size-3" />
        </Button >
    </>);
}
