import { forwardRef, type MouseEvent, type Ref } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence } from "motion/react";
import { classNames } from "@/utils";
import { rowParentActiveClasses } from "@/components/4-dialogs/4-dlg-field-catalog/3-items-grid/2-fld-cat-item-row";
import { doDeleteItemAtom, doSelectByKbdAtom, doSetSelectItemValueAtom, doSwapItemsAtom, MFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { SingleRow } from "./4-single-row";
import { PopupMenuItemState } from "./5-row-popup-menu";

export function PanelActionsListWoRef({ mFormProps }: { mFormProps: MFormProps; }, ref: Ref<HTMLDivElement>) {
    const ctx = mFormProps.mFormCtx.manual;
    const chunks = useAtomValue(ctx.chunksAtom);

    const selectByKey = useSetAtom(doSelectByKbdAtom);
    const selectItem = useSetAtom(doSetSelectItemValueAtom);
    const deleteItem = useSetAtom(doDeleteItemAtom);
    const swapItems = useSetAtom(doSwapItemsAtom);

    return (<>
        <div ref={ref} className={classNames("min-h-10 outline-none", rowParentActiveClasses)} tabIndex={0} onKeyDown={(e) => selectByKey(ctx, e.key)}>

            <AnimatePresence initial={false}>
                {chunks.map(
                    (chunk, idx) => {
                        const lastItemIdx = chunks.length - 1;

                        const menuState: PopupMenuItemState = {
                            hasUp: idx > 0,
                            hasDn: idx < lastItemIdx,
                            onDelete: (e) => { e.stopPropagation(); deleteItem(ctx, idx); },
                            onUp: (e) => { e.stopPropagation(); swapItems(ctx, idx, idx - 1); },
                            onDn: (e) => { e.stopPropagation(); swapItems(ctx, idx, idx + 1); },
                        };

                        return (
                            <SingleRow
                                mFormProps={mFormProps}
                                chunk={chunk}
                                menuState={menuState}
                                idx={idx}
                                onClick={(e: MouseEvent) => selectItem(ctx, idx, (v) => e.ctrlKey ? !v : true)}
                                key={chunk.uid5}
                                // Not yet, AnimatePresence not working when switching between files
                                // initial={{ opacity: 0, height: 0 }}
                                // animate={{ opacity: 1, height: "auto" }}
                                // exit={{ opacity: 0, height: 0 }}
                                // transition={{ opacity: { duration: .2 }, type: "spring", duration: 1 }}
                            />
                        );
                    })
                }
            </AnimatePresence>
        </div>
    </>);
}

export const PanelActionsList = forwardRef(PanelActionsListWoRef);
