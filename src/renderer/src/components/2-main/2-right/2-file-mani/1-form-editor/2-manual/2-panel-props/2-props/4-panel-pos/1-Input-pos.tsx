import { useSetAtom } from "jotai";
import { type RowInputStateAtom, InputOrCheckWithErrorMsg } from "@/ui/local-ui";
import { type FieldHighlightCtx, doHighlightRectAtom } from '@/store';

export function InputPos({ valueAtom, label, highlightCtx }: { valueAtom: RowInputStateAtom; label: string; highlightCtx?: FieldHighlightCtx; }) {
    const doHighlightRect = useSetAtom(doHighlightRectAtom);

    function onFocusBlur(focusOn: boolean) {
        if (highlightCtx) {
            doHighlightRect({ ...highlightCtx, focusOrBlur: focusOn });
        }
    }

    return (
        <label className="flex flex-col gap-1">
            <span>
                {label}
            </span>

            <div className="min-w-16 max-w-16 flex items-center gap-1" title={`${label} offset from the top-left corner of the window client area`}>
                <InputOrCheckWithErrorMsg
                    stateAtom={valueAtom}
                    asCheckbox={false}
                    onFocus={() => onFocusBlur(true)}
                    onBlur={() => onFocusBlur(false)}
                />

                <span className="pt-0.5">
                    px
                </span>
            </div>
        </label>
    );
}
