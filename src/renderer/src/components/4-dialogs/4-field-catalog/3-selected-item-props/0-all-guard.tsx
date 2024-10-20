import { type SelectedItemAtom, showPropsAtom } from "@/store";
import { useAtomValue } from "jotai";
import { HTMLAttributes } from "react";
import { SelectedItemBody } from "./1-body";
import { AnimatePresence } from "framer-motion";
import { classNames } from "@/utils";

export function RightPanelGuard({selectedItemAtom, className, ...rest}: { selectedItemAtom: SelectedItemAtom; } & HTMLAttributes<HTMLDivElement>) {
    const showProps = useAtomValue(showPropsAtom);
    return (<>
        <AnimatePresence>
            {showProps && (
                <div className={classNames("text-xs flex flex-col", className)} {...rest}>
                    <SelectedItemBody selectedItemAtom={selectedItemAtom} />
                </div>
            )}
        </AnimatePresence>
    </>);
}
