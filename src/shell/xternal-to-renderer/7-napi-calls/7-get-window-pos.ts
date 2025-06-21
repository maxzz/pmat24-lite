import { addon } from "./0-addon";
import { mainToRenderer } from "../1-gates-in-main";
import { type DragAndDropper, type DragAndDropParams, type DragAndDropResult } from "./pmat-plugin-types";

/**
 * Get position inside window by drag and drop for manual mode 'position' action.
 */

export function dndActionInit(params: DragAndDropParams): string {
    if (!gDragAndDropper) {
        gDragAndDropper = new addon.DragAndDropper();
    }

    if (!gDragAndDropper) {
        return 'no.glb';
    }

    const actionParams = JSON.stringify({ hwnd: params.hwnd });
    let rv_error: string = '';

    gDragAndDropper.init(actionParams,
        (err: any, data?: string) => {
            if (err) {
                console.error('dnd.error 1');
                rv_error = `'dnd.error 1': ${err}`;
                return;
            }

            try {
                const tempFix = (data || '').replace(/{status:/g, '{"status":');
                const res = JSON.parse(tempFix || '') as DragAndDropResult;

                if (res.status === 'progress') { // status: 'initialized' | 'progress' | 'done' | 'abandoned'
                    //console.log('dnd.progress', data);

                    mainToRenderer({ type: 'm2r:position-progress', progress: res });
                    return;
                } else {
                    console.log('dnd.utility res', res);
                }
            }
            catch (error) {
                console.error('dnd.error 2', error, data);
                rv_error = `'dnd.error 2': ${error}`;
            }
        }
    );

    return rv_error;
}

export function dndAction(actionName: DragAndDropActionParams): void {
    if (!gDragAndDropper) {
        gDragAndDropper = new addon.DragAndDropper();
    }

    if (!gDragAndDropper) {
        return;
    }

    gDragAndDropper[actionName]('');
}

export type DragAndDropInitParams = DragAndDropParams;
export type DragAndDropActionParams = 'move' | 'stop';

let gDragAndDropper: DragAndDropper | null = null;
