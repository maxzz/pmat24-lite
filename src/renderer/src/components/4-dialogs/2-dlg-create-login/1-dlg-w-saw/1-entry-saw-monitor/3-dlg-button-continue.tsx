import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { doMoveToSecondDlgAtom, napiBuildState } from "@/store";

export function ButtonContinue() {
    const isRunning = useSnapshot(napiBuildState).buildRunning;
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);
    return (
        <Button
            className="place-self-center active:scale-[.97]" variant="default" size="xs"
            disabled={isRunning}
            onClick={() => doMoveToSecondDlg({ cancel: false })}
        >
            Continue
        </Button>
    );
}
