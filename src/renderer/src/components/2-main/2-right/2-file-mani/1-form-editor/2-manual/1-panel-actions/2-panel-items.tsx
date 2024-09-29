import { useAtomValue, useSetAtom } from "jotai";
import { doDeleteItemAtom, doSelectByKbdAtom, doSetSelectItemValueAtom, doSwapItemsAtom, MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { SingleRow } from "./3-single-row";
import { MenuState } from "./4-row-popup-menu";
import { rowParentActiveClasses } from "../8-manual-shared-styles";
import { classNames } from "@/utils";
import { AnimatePresence } from "framer-motion";

export function PanelActionsList({ ctx: ctxForm }: { ctx: MFormContextProps; }) {
    const ctx = ctxForm.mFormAtoms.manual;
    const chunks = useAtomValue(ctx.chunksAtom);

    const selectByKey = useSetAtom(doSelectByKbdAtom);
    const selectItem = useSetAtom(doSetSelectItemValueAtom);
    const deleteItem = useSetAtom(doDeleteItemAtom);
    const swapItems = useSetAtom(doSwapItemsAtom);

    return (<>
        <div className={classNames("min-h-10 outline-none", rowParentActiveClasses)} tabIndex={0} onKeyDown={(e) => selectByKey(ctx, e.key)}>

            <AnimatePresence initial={false}>
                {chunks.map(
                    (chunk, idx) => {
                        const lastItemIdx = chunks.length - 1;

                        const menuState: MenuState = {
                            onDelete: (e) => { e.stopPropagation(); deleteItem(ctx, idx); },
                            onUp: (e) => { e.stopPropagation(); swapItems(ctx, idx, idx - 1); },
                            onDn: (e) => { e.stopPropagation(); swapItems(ctx, idx, idx + 1); },
                            hasUp: idx > 0,
                            hasDn: idx < lastItemIdx,
                        };

                        return (
                            <SingleRow
                                // Not yet, AnimatePresence not working when switching between files
                                
                                // initial={{ opacity: 0, height: 0 }}
                                // animate={{ opacity: 1, height: "auto" }}
                                // exit={{ opacity: 0, height: 0 }}
                                // transition={{ opacity: { duration: .2 }, type: "spring", duration: 1 }}

                                formCtx={ctx}
                                chunk={chunk}
                                menuState={menuState}
                                idx={idx}
                                onClick={(e) => selectItem(ctx, idx, (v) => e.ctrlKey ? !v : true)}
                                key={chunk.uid5}
                            />
                        );
                    })
                }
            </AnimatePresence>
        </div>
    </>);
}
