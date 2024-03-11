import { useEffect, useRef, useState } from "react";
import { atom, PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import type { DoSetFilesFromDropAtom } from "@/store";

type DragHandlersProps = {
    doSetFilesFromDropAtom: DoSetFilesFromDropAtom;
    activeAtom: PrimitiveAtom<boolean>;
};

export function useDragHandlers({ doSetFilesFromDropAtom, activeAtom }: DragHandlersProps) {
    const setDropActive = useSetAtom(activeAtom);
    const droppedFiles = useSetAtom(doSetFilesFromDropAtom);
    const activeListenersRef = useRef(0);

    useEffect(
        () => {
            function _onDragEnter() {
                if (!activeListenersRef.current++) {
                    setDropActive(true);
                }
            }
            function _onDragOver(event: DragEvent) {
                event.preventDefault();
            }
            function _onDragLeave() {
                if (!--activeListenersRef.current) {
                    setDropActive(false);
                }
            }
            function _onDrop(event: DragEvent) {
                event.preventDefault();
                activeListenersRef.current = 0;
                setDropActive(false);
                event.dataTransfer && droppedFiles(event.dataTransfer);
            }

            const a = document.addEventListener;
            a('dragenter', _onDragEnter);
            a('dragover', _onDragOver);
            a('dragleave', _onDragLeave);
            a('drop', _onDrop);

            return () => {
                const r = document.removeEventListener;
                r('dragenter', _onDragEnter);
                r('dragover', _onDragOver);
                r('dragleave', _onDragLeave);
                r('drop', _onDrop);
            };
        }, []
    );
}

export function DropItDoc({ doSetFilesFromDropAtom }: { doSetFilesFromDropAtom: DoSetFilesFromDropAtom; }) {
    const [activeAtom] = useState(atom(false));
    const active = useAtomValue(activeAtom);
    useDragHandlers({ doSetFilesFromDropAtom, activeAtom, });
    return (<>
        {active && (
            <div className={`fixed inset-0 grid place-items-center text-5xl font-bold text-slate-50 bg-slate-800/90 z-10`}>
                Drop it!
            </div>
        )}
    </>);
}
