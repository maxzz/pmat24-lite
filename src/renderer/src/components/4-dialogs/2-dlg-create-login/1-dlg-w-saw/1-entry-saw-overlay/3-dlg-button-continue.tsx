import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { napiBuildState } from "@/store";
import { doMoveToSecondDlgAtom } from "../0-ctx";

export function ButtonContinue({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const isRunning = useSnapshot(napiBuildState).buildRunning;
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);
    return (
        <Button
            className="place-self-center active:scale-[.97]" variant="default" size="xs"
            disabled={isRunning}
            onClick={() => {
                doMoveToSecondDlg({ cancel: false });
            }}
        >
            Continue
        </Button>
    );
}
