import { addon } from "./0-addon";
import { type DragAndDropper, type DragAndDropParams } from "./pmat-plugin-types";

/**
 * Get position inside window by drag and drop for manual mode 'position' action.
 */

export function dndAction(params: DragAndDropCallParams): Promise<string> {
    if (!gDragAndDropper) {
        gDragAndDropper = new addon.DragAndDropper();
    }

    return new Promise<string>((resolve, reject) => {
        if (!gDragAndDropper) {
            reject('no.glb');
            return;
        }

        const actionParams = params.what === 'init' ? JSON.stringify({ hwnd: params.hwnd }) : '';
        const actionName: keyof DragAndDropper = params.what;

        gDragAndDropper[actionName](actionParams,
            (err: any, data?: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data || '');
                }
            }
        );
    });
}

export type DragAndDropCallParams = Prettify<{ what: 'init'; } & DragAndDropParams | { what: 'move' | 'stop'; }>;

let gDragAndDropper: DragAndDropper | null = null;
