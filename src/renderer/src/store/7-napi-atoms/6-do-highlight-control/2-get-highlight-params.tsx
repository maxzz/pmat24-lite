import { type Getter } from "jotai";
import { type Meta } from "@/store/manifest";
import { type Rect4, type R2MInvokeParams } from "@shared/ipc-types";
import { type FieldHighlightCtx } from "../../1-atoms/2-file-mani-atoms/9-types";

export function getHighlightFieldParams(hwnd: string, isBrowser: boolean, { nFieldCtx, mFieldCtx }: FieldHighlightCtx, get: Getter): R2MInvokeParams.HighlightField | undefined {
    if (nFieldCtx) {
        const metaField: Meta.Field = nFieldCtx.metaField;
        const path: Meta.Path = metaField.path;

        const params: R2MInvokeParams.HighlightField = {
            params: {
                hwnd,
                rect: isBrowser ? undefined : getFieldRect(path.loc),
                accId: isBrowser ? metaField.pidx : undefined,

                highlightColor: '#ff8800',
                width: 5,
                blinks: 0,
            }
        };
        return params;
    }
    else if (mFieldCtx) {
        if (mFieldCtx.type === 'pos') {
            const xState = get(mFieldCtx.xAtom);
            const yState = get(mFieldCtx.yAtom);

            if (xState.error || yState.error) {
                console.log('manualFieldHighlightAtom: x or y is invalid'); //TODO: after error state paste did not trigger highlight
                return;
            }

            const x = +xState.data;
            const y = +yState.data;

            const params: R2MInvokeParams.HighlightField = {
                params: {
                    hwnd,
                    rect: { left: x - 1, top: y - 1, right: x + 1, bottom: y + 1, },

                    highlightColor: '#ff8800',
                    width: 5,
                }
            };
            return params;
        }
    }
}

function getFieldRect(loc: string | undefined): Rect4 | undefined {
    if (!loc) {
        return undefined;
    }

    const allStr = loc.split('|').pop() || ''; // Get location of field in the form as the last items in locations string.
    if (!allStr) {
        return undefined;
    }

    const [left, top, right, bottom] = allStr.split(' ').map(Number);
    const rv = { left: left + 2, top: top + 2, right: right - 2, bottom: bottom - 2, };
    return rv;
}
