import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { subscribe } from "valtio";
import { type RowInputStateAtom, InputOrCheckWithErrorMsg } from "@/ui/local-ui";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { buildState } from "./9-pos-build-state";
import { ButtonHighlightClick } from "./4-btn-hihglight-click";
import { doHighlightRectAtom } from '@/store';

export function PropsEditorPos({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {

    const doHighlightRect = useSetAtom(doHighlightRectAtom);

    function expose() {
        const highlightCtx = { mFieldCtx: item, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx };
        doHighlightRect({ ...highlightCtx, focusOrBlur: true });
    }

    useBuildStateLink(item);

    return (
        <div className="h-full grid grid-cols-[auto,auto,1fr] grid-row-[1fr,auto] gap-2">
            <InputPos valueAtom={item.xAtom} label="X" expose={expose} />
            <InputPos valueAtom={item.yAtom} label="Y" expose={expose} />

            <div className="row-start-2 self-end pb-1">
                <ButtonHighlightClick item={item} fileUsCtx={fileUsCtx} />
            </div>
        </div>
    );
}

function InputPos({ valueAtom, label, expose }: { valueAtom: RowInputStateAtom; label: string; expose: () => void; }) {
    return (
        <label className="flex flex-col gap-1">
            <span>
                {label}
            </span>

            <div className="min-w-16 max-w-16 flex items-center gap-1" title={`${label} offset from the top-left corner of the window client area`}>
                <InputOrCheckWithErrorMsg stateAtom={valueAtom} onFocus={expose}/>

                <span className="pt-0.5">
                    px
                </span>
            </div>
        </label>
    );
}

function useBuildStateLink(item: ManualFieldState.CtxPos) {
    const setPosValueX = useSetAtom(item.xAtom);
    const setPosValueY = useSetAtom(item.yAtom);

    useEffect(
        () => {
            const unsubscribe = subscribe(buildState.getPosProgress,
                () => {
                    console.log('buildState.getPosProgress.point', buildState.getPosProgress.point);
                    //TODO: use debounce and don't do highlight during dragging

                    setPosValueX((prev) => ({ ...prev, data: `${buildState.getPosProgress.point?.x || 0}` }));
                    setPosValueY((prev) => ({ ...prev, data: `${buildState.getPosProgress.point?.y || 0}` }));
                }
            );
            return unsubscribe;
        }, []
    );
}

// TODO: Add button: select the click point
// TODO: App preview or drag with client rects recalculation
// TODO: Add zoom in/out buttons
