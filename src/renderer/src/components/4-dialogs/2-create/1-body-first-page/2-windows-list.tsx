import { PrimitiveAtom, useAtom } from "jotai";
import { Checkbox, Label } from "@/ui";
import { DetectedWindow, detectedWindows } from "./4-test-detected-windows";

export function WindowsList({ selectedIdxAtom }: { windows: DetectedWindow[]; selectedIdxAtom: PrimitiveAtom<number>; }) {
    const [selectedIdx, setSelectedIdx] = useAtom(selectedIdxAtom);
    return (
        <div className="px-3 py-2 flex flex-col gap-2">
            {detectedWindows.length === 0 && (
                <div className="text-muted-foreground">
                    No windows detected
                </div>
            )}

            {detectedWindows.length !== 0 && detectedWindows.map(
                (window, idx) => (
                    <Label key={window.id} className="text-xs font-normal cursor-pointer flex items-center gap-1">
                        <Checkbox className="size-4" checked={idx === selectedIdx} onCheckedChange={(v) => setSelectedIdx(!!v ? idx : -1)} />
                        <div>{window.name}</div>
                    </Label>
                ))
            }
        </div>
    );
}
