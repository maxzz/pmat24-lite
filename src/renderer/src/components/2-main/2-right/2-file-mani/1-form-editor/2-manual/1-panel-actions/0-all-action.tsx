import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";

import { PanelActionsTitle } from "./1-panel-title";
//import { PanelActionsList } from "./2-panel-items";
import { classNames } from "@/utils";

import { useInitSelectedIdx } from "@/store/atoms/3-file-mani-atoms";
import { editorFrameClasses } from "../shared-styles";

export function ManualPanelActions({ maniAtoms, formAtoms, formIdx }: MFormContextProps) {
    // const cb = useInitSelectedIdx();
    // useEffect(() => { cb(); }, []);

    const items = useAtomValue(formAtoms.manual.chunksAtom);
    return (
        <div className={classNames("h-full min-h-[20rem] flex flex-col space-y-1 select-none", editorFrameClasses/*, focusWithinClasses*/)}>
            <PanelActionsTitle />

            {/* <PanelActionsList /> */}
            <div className="">
                {items.map(
                    (item, idx) => (
                        <div key={idx}>
                            {item.type}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
