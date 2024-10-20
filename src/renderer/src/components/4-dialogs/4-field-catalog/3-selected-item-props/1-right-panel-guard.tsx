import { type SelectedItemAtom, showPropsAtom } from "@/store";
import { useAtomValue } from "jotai";
import { HTMLAttributes } from "react";
import { SelectedItemBody } from "./0-all";

export function RightPanelGuard(props: { selectedItemAtom: SelectedItemAtom; } & HTMLAttributes<HTMLDivElement>) {
    const showProps = useAtomValue(showPropsAtom);
    return (<>
        {showProps && (
            <SelectedItemBody {...props} />
        )}
    </>);
}
