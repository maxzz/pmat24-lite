import { PrimitiveAtom, useAtom } from "jotai";
import { Checkbox, Label } from "@/ui";
import { DetectedWindow, detectedWindows } from "./4-test-detected-windows";
import { classNames } from "@/utils";

export function WindowsList({ selectedIdxAtom }: { windows: DetectedWindow[]; selectedIdxAtom: PrimitiveAtom<number>; }) {
    const [selectedIdx, setSelectedIdx] = useAtom(selectedIdxAtom);
    return (
        <div className="py-2 flex flex-col">
            {detectedWindows.length === 0 && (
                <div className="px-3 text-muted-foreground">
                    No windows detected
                </div>
            )}

            {detectedWindows.length !== 0 && detectedWindows.map(
                (window, idx) => {
                    const checked = idx === selectedIdx;
                    return (
                        <Label
                            className={classNames("px-3 py-1.5 text-xs font-normal cursor-pointer select-none flex items-center gap-2.5", checked && "bg-accent")}
                            key={window.id}
                        >
                            <Checkbox className="size-4" checked={checked} onCheckedChange={(v) => setSelectedIdx(!!v ? idx : -1)} />
                            <div>{window.name}</div>
                        </Label>
                    );
                })
            }
        </div>
    );
}
