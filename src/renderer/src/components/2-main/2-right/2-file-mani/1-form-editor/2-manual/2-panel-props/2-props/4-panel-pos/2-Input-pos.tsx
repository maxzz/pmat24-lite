import { useSetAtom } from "jotai";
import { type FieldHighlightCtx, fieldHighlightAtom } from '@/store';
import { type RowInputStateAtom, InputOrCheckWithErrorMsg, InputOrCheckWithTooltip } from "@/ui/local-ui";

//import { InputXY } from "./2-input-xy";
// function eventNumber(e: React.ChangeEvent<HTMLInputElement>, defValue: number = 0) {
//     let n = parseInt(e.target.value);
//     if (Number.isNaN(n)) {
//         n = defValue;
//     }
//     return n;
// }

export function InputPos({ valueAtom, label, highlightCtx }: { valueAtom: RowInputStateAtom; label: string; highlightCtx?: FieldHighlightCtx; }) {
    const doFieldHighlight = useSetAtom(fieldHighlightAtom);

    function onFocusBlur(focusOn: boolean) {
        if (highlightCtx) {
            doFieldHighlight({ ...highlightCtx, focusOn });
        }
    }

    return (
        <label className="flex flex-col gap-1">
            <span>
                {label}
            </span>

            <div className="max-w-24 flex items-center gap-1" title={`${label} offset from the top-left corner of the window client area`}>
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
