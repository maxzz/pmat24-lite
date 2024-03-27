import { useAtomValue } from "jotai";
import { rightPanelSelectedContentAtom } from "@/store";

export function RightTitle() {
    const rightPanel = useAtomValue(rightPanelSelectedContentAtom);
    if (!rightPanel) {
        return <div className="">No File</div>;
    }
    return (
        <div className="">Name</div>
    );
}
