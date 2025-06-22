import { type PrimitiveAtom, atom } from "jotai";
import { type HighlightHwnd } from "@/store/store-types";
import { invokeMainTyped, R2MCalls } from "@/xternal-to-main";

export const dndActionInitAtom = atom(
    null,
    async (get, set, hwndAtom: PrimitiveAtom<HighlightHwnd>): Promise<string> => {
        const hwnd = get(hwndAtom);
        if (!hwnd) {
            console.log('hwnd not found');
            return 'no.wnd';
        }

        const data = await invokeMainTyped({ type: 'r2mi:get-window-pos-init', params: { what: 'init', hwnd: hwnd.hwnd } });
        if (data) {
            console.log('failed: dnd.init', data);
        }
        return data;
    }
);

export const dndActionAtom = atom(
    null,
    (get, set, action: 'move' | 'stop'): void => {
        R2MCalls.getWindowPosAction(action);
    }
);
