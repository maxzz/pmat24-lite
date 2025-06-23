import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { InputErrorPopupMessage, OptionAsString } from "@/ui/local-ui";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { doHighlightRectAtom } from '@/store';
import { ButtonHighlightClick } from "./4-btn-hihglight-click";
import { NewInputXY } from "./1-picker-dnd-w-napi";
import { hasMain } from "@/xternal-to-main";

export function PropsEditorPos({ item, fileUsCtx }: { item: ManualFieldState.CtxPos; fileUsCtx: FileUsCtx; }) {

    const showHighlightControls = hasMain();
    // const showHighlightControls = false;

    const doHighlightRect = useSetAtom(doHighlightRectAtom);

    const expose = useCallback(
        () => {
            const highlightCtx = { mFieldCtx: item, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx };
            doHighlightRect({ ...highlightCtx, focusOrBlur: true });
        },
        [item, fileUsCtx.fileUs, fileUsCtx.formIdx]
    );

    return (
        <div className="h-full grid grid-rows-[auto,1fr,auto]">
            <div className="grid grid-cols-[auto_auto_1fr] gap-x-2" style={{ gridTemplateAreas: "'r11 r12 r13' 'r21 r22 r23' 'r33 r33 r33'" }}>
                <div className="pb-0.5">
                    x
                </div>
                <div>
                    y
                </div>

                <InputPosNumbers item={item} expose={expose} />
            </div>

            <div className="row-start-3 self-end pb-1">
                {showHighlightControls && (<>
                    <NewInputXY item={item} fileUsCtx={fileUsCtx} />
                    <ButtonHighlightClick item={item} fileUsCtx={fileUsCtx} />
                </>)}
            </div>
        </div>
    );
}

function InputPosNumbers({ item, expose }: { item: ManualFieldState.CtxPos; expose: () => void; }) {

    const xAtom = item.xAtom;
    const yAtom = item.yAtom;

    const xState = useAtomValue(xAtom);
    const yState = useAtomValue(yAtom);
    const hasErrorX = !!(xState.error && xState.touched);
    const hasErrorY = !!(yState.error && yState.touched);
    const hasError = hasErrorX || hasErrorY;

    function errorClasses(hasError: boolean) {
        return classNames("px-2 h-7 text-xs max-w-[7ch]", hasError && 'outline-offset-[0px] outline-red-500', "text-xs");
    }

    return (<>
        <div className="py-0.5 flex items-center gap-0.5" style={{ gridArea: 'r21' }}>
            <OptionAsString stateAtom={xAtom} className={errorClasses(hasErrorX)} onFocus={() => !hasError && expose()} onValueStateChange={() => !hasError && expose()} />
            px
        </div>

        <div className="flex items-center gap-0.5" style={{ gridArea: 'r22' }}>
            <OptionAsString stateAtom={yAtom} className={errorClasses(hasErrorY)} onFocus={() => !hasError && expose()} onValueStateChange={() => !hasError && expose()} />
            px
        </div>

        <div style={{ gridArea: 'r33' }}>
            <InputErrorPopupMessage hasError={hasError} error={xState.error || yState.error} />

            {/* OK: */}
            {/* TODO: the below works but should be different message: open target window to see the click point */}
            {/* <InputPopupMessage show={hasError} message="open targer window to see the click point" messageClasses="text-slate-500" /> */}
            {/* or show icon as linked to the target window and button name: Find target window */}
        </div>
    </>);
}

//TODO: Add button: select the click point
//TODO: App preview or drag with client rects recalculation
//TODO: Add zoom in/out buttons

//05.31.25
//TODO: manifest default name
//TODO: proper grid - done

//06.01.25
//TODO: hihglight debounce - done
//TODO: only one call get tlw info with PROCESS NAME i.e. is open (no need to check minimize) and this should done for array of windows
//TODO: for proper highlight, we need to get the window handle and then get the client rect
//
//TODO: validate should be done inside highlight. Now it is done in the main process and not handled properly.
//TODO: show popup hint if there is no hwnd
//
//TODO: after error state paste did not trigger highlight
