import { addon } from "./0-addon";
import { type DragAndDropper, type DragAndDropParams, type DragAndDropResult, type TargetPosition } from "./pmat-plugin-types";
import { mainToRenderer } from "./9-external";
import { a } from "@react-spring/web";

/**
 * Get position inside window by drag and drop for manual mode 'position' action.
 */
export function getWindowPos(hwnd: string): Promise<TargetPosition> {
    return new Promise<TargetPosition>(
        (resolve, reject) => {
            const params: DragAndDropParams = { hwnd };
            const param = JSON.stringify(params);

            // addon.dragAndDrop(param,
            //     (err: string, data: string) => {
            //         console.log('+++++++++++++', data);

            //         if (err) {
            //             reject(err);
            //             return;
            //         }

            //         try {
            //             const res = JSON.parse(data) as DragAndDropResult;

            //             if (res.status === 'progress') {
            //                 console.log('progress', res.point);

            //                 mainToRenderer({ type: "m2r:position-progress", progress: res });
            //                 return;
            //             }

            //             resolve(res);
            //         } catch (error) {
            //             console.error('error', error);

            //             reject('>>>Faieled to get posiotion.');
            //         }
            //     }
            // );
        }
    );
}

export type DragAndDropCallParams = Prettify<{ what: 'init'; } & DragAndDropParams | { what: 'move' | 'stop'; }>;

let gDragAndDropper: DragAndDropper | null = null;

export function dndAction(params: DragAndDropCallParams) {
    if (!gDragAndDropper) {
        gDragAndDropper = new addon.DragAndDropper();
    }

    return new Promise<void>((resolve, reject) => {
        if (!gDragAndDropper) {
            reject('no.glb');
            return;
        }

        const actionName: keyof DragAndDropper = params.what;
        const actionParams = params.what === 'init' ? JSON.stringify({ hwnd: params.hwnd }) : '';

        gDragAndDropper[actionName](actionParams, (err: any) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
