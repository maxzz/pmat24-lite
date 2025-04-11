import { useAtom, useSetAtom } from "jotai";
import { searchFilterData } from "@/store";
import { IconClose } from "@/ui/icons";
import { Button } from "@/ui";
import { doUpdateTreeSelectedByRightPanelAtom } from "../../2-files-list";

export function CurrentFilter() {

    const doUpdateTreeSelectedByRightPanel = useSetAtom(doUpdateTreeSelectedByRightPanelAtom);
    const [text, setText] = useAtom(searchFilterData.textAtom);
    if (!text) {
        return null;
    }

    return (<>
        <div className="font-light">Filter:</div>
        <div className="ml-1 truncate">{text}</div>

        <Button className="flex-none p-1 h-auto" size="xs" variant="ghost" onClick={() => { setText(''); setTimeout(() => doUpdateTreeSelectedByRightPanel(), 500); }}>
            <IconClose className="size-3" />
        </Button >
    </>);
}

//TODO: maybe go to the second row if not enough space
//TODO: maybe add frame but it will make button impression

//TODO: mark modified files with yellow not red or orange
