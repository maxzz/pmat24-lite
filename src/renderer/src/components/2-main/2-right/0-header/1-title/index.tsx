import { useAtomValue } from "jotai";
import { rightPanelSelectedContentAtom } from "@/store";

export function RightTitle() {
    const rightPanel = useAtomValue(rightPanelSelectedContentAtom);
    if (!rightPanel) {
        return <div className="h-full flex items-center">No File</div>;
    }
    return (
        <div className="h-14">Name {rightPanel.fname}</div>
    );
}
