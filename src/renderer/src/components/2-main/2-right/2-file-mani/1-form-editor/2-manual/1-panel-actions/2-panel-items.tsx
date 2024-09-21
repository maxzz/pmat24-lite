import { useAtomValue, useSetAtom } from "jotai";
import { doDeleteItemAtom, doSelectByKbdAtom, doSetSelectItemValueAtom, doSwapItemsAtom, MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { SingleRow } from "./3-single-row";
import { MenuState } from "./4-row-popup-menu";
import { rowParentActiveClasses } from "../8-manual-shared-styles";
import { classNames } from "@/utils";

export function PanelActionsList({ ctx: ctxForm }: {ctx: MFormContextProps}) {
    const ctx = ctxForm.formAtoms.manual;
    const chunks = useAtomValue(ctx.chunksAtom);

    const selectByKey = useSetAtom(doSelectByKbdAtom);
    const selectItem = useSetAtom(doSetSelectItemValueAtom);
    const deleteItem = useSetAtom(doDeleteItemAtom);
    const swapItems = useSetAtom(doSwapItemsAtom);

    return (<>
        <div className={classNames("min-h-10 outline-none", rowParentActiveClasses)} tabIndex={0} onKeyDown={(e) => selectByKey(ctx, e.key)}>

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
                            ctx={ctx}
                            chunk={chunk}
                            menuState={menuState}
                            idx={idx}
                            onClick={(e) => selectItem(ctx, idx, (v) => e.ctrlKey ? !v : true)}
                            key={chunk.uid5}
                        />
                    );
                })
            }
            
        </div>
    </>);
}
