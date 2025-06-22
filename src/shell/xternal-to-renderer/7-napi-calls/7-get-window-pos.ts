import { addon } from "./0-addon";
import { mainToRenderer } from "../1-gates-in-main";
import { type DragAndDropper, type DragAndDropParams, type DragAndDropResult, type OkIfEmptyString, type TargetPosition, type Rect4 } from "./pmat-plugin-types";
import { debounce, isPointInsideRect } from "@shell/3-utils-main";

/**
 * Init get position inside window operation by drag and drop for manual mode 'position' action.
 */
export function dndActionInit(params: DragAndDropParams): OkIfEmptyString {
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
                console.error('dnd.error 1');
                error = `'dnd.error 1': ${err}`;
                return;
            }

            try {
                const tempFix = (data || '').replace(/{status:/g, '{"status":');
                const res = JSON.parse(tempFix || '') as DragAndDropResult;

                if (res.status === 'progress') {
                    debouncedSendToClient(res);
                    printProgress(res);
                } else {
                    console.log('dnd.utility res', res);
                }
            }
            catch (error) {
                console.error('dnd.error 2', error, data);
                error = `'dnd.error 2': ${error}`;
            }
        }
    );

    return error;
}

export function dndAction(actionName: DragAndDropActionParams): void {
    dragAndDropper?.[actionName](''); // console.log('call.init.fisrt');
}

export type DragAndDropInitParams = DragAndDropParams;
export type DragAndDropActionParams = 'move' | 'stop';

let dragAndDropper: DragAndDropper | null = null;

//

function sendToClient(res: TargetPosition) {
    res.point.x = Math.round(res.point.x);
    res.point.y = Math.round(res.point.y);
    mainToRenderer({ type: 'm2r:position-progress', progress: res });
}

const debouncedSendToClient = debounce(sendToClient, 100);

//

function Rect4ToString(rect: Rect4) {
    const [l, t, r, b] = Object.values(rect).map((v, idx) => `${Math.round(v)}`[idx === 0 || idx === 2 ? 'padStart' : 'padEnd'](4, ' '));
    return `lt: ${l},${t}, rb: ${r},${b}`;
}

function printProgress(res: TargetPosition) {
    console.log(
        `dnd.progress [IS: %s] pointXY: {%s, %s} CLIENT: {%s}, WINDOW: {%s}, MSG: %o`,
        isPointInsideRect(res.point, res.clientRect) ? ' IN' : 'OUT',
        `${Math.round(res.point.x)}`.padStart(4, ' '),
        `${Math.round(res.point.y)}`.padStart(4, ' '),
        Rect4ToString(res.clientRect),
        Rect4ToString(res.windowRect),
        { data: JSON.stringify(res) }
    );
}
