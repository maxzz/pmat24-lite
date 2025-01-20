import { useAtomValue, useSetAtom } from "jotai";
import { doDeleteItemAtom, doSelectByKbdAtom, doSetSelectItemValueAtom, doSwapItemsAtom, MFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { SingleRow } from "./4-single-row";
import { MenuState } from "./5-row-popup-menu";
import { classNames } from "@/utils";
import { AnimatePresence } from "framer-motion";
import { rowParentActiveClasses } from "@/components/4-dialogs/4-field-catalog/3-items-grid/2-fld-cat-item-row";

export function PanelActionsList({ ctx: ctxForm }: { ctx: MFormContextProps; }) {
    const ctx = ctxForm.mAllAtoms.manual;
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
