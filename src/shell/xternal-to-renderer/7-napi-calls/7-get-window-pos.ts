import { addon } from "./0-addon";
import { mainToRenderer } from "../1-gates-in-main";
import { type DragAndDropper, type DragAndDropParams, type DragAndDropResult, type OkIfEmptyString, type TargetPosition, type Rect4, type PointXY } from "./pmat-plugin-types";
import { debounce, ptInsideRect } from "@shell/3-utils-main";

/**
 * Init get position inside window operation by drag and drop for manual mode 'position' action.
 */
export function dndActionInit(params: DragAndDropParams): OkIfEmptyString { // call 'r2mi:get-window-pos-init' in main
    if (!dragAndDropper) {
        dragAndDropper = new addon.DragAndDropper();
        if (!dragAndDropper) {
            return 'no.glb';
        }
    }

    const paramsStr = JSON.stringify({ hwnd: params.hwnd });
    let error: string = '';

    dragAndDropper.init(paramsStr,
        (err: any, data?: string) => {
            if (err) {
                error = `'dnd.error 1': ${err}`;
                return;
            }

            try {
                const tempFix = (data || '').replace(/{status:/g, '{"status":');
                const res = JSON.parse(tempFix || '') as DragAndDropResult;

                if (res.status === 'progress') {
                    debouncedSendToClient(res);
                    //printProgressDebounced(res);
                } else {
                    console.log('dnd.utility res', res);
                }
            }
            catch (error) {
                error = `'dnd.error 2': ${error}`;
            }
        }
    );

    return error;
}

export function dndAction(actionName: 'move' | 'stop'): void {
    dragAndDropper?.[actionName](''); // console.log('call.init.fisrt');
}

let dragAndDropper: DragAndDropper | null = null;

// Call to client

export type PosTrackerCbType = Prettify<
    & PointXY                 // Current mouse coordinates converted to the client area of target window.
    & {
        isInside: boolean;    // Is mouse inside the target window
    }
>;

function sendToClient(res: TargetPosition) {
    const { point: { x, y }, clientRect } = res;
    mainToRenderer({
        type: 'm2r:position-progress',
        progress: {
            x: Math.round(x),
            y: Math.round(y),
            isInside: ptInsideRect(x, y, clientRect),
        }
    });
}

const debouncedSendToClient = debounce(sendToClient, 100);

// Print utilities

function Rect4ToString(rect: Rect4) {
    const [l, t, r, b] = Object.values(rect).map((v, idx) => `${Math.round(v)}`[idx === 0 || idx === 2 ? 'padStart' : 'padEnd'](4, ' '));
    return `lt: ${l},${t}, rb: ${r},${b}`;
}

const printProgressDebounced = debounce(
    function printProgress(res: TargetPosition) {
        const { point: { x, y }, clientRect, windowRect } = res;
        console.log(
            `dnd.progress [IS: %s] pointXY: {%s, %s} CLIENT: {%s}, WINDOW: {%s}, MSG: %o`,
            ptInsideRect(x, y, clientRect) ? ' IN' : 'OUT',
            `${Math.round(x)}`.padStart(4, ' '),
            `${Math.round(y)}`.padStart(4, ' '),
            Rect4ToString(clientRect),
            Rect4ToString(windowRect),
            { data: JSON.stringify(res) }
        );
    }, 1000
);

//
