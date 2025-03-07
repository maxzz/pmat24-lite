import { addon } from "./0-addon";
import { type DragAndDropParams, type DragAndDropResult, type TargetPosition } from "./pmat-plugin-types";
import { mainToRenderer } from "./9-external";

/**
 * Get position inside window by drag and drop for manual mode 'position' action.
 */
export function getWindowPos(hwnd: string): Promise<TargetPosition> {
    return new Promise<TargetPosition>(
        (resolve, reject) => {
            const params: DragAndDropParams = { hwnd };
            const param = JSON.stringify(params);

            addon.dragAndDrop(param,
                (err: string, data: string) => {
                    console.log('+++++++++++++', data);

                    if (err) {
                        reject(err);
                        return;
                    }

                    try {
                        const res = JSON.parse(data) as DragAndDropResult;

                        if (res.status === 'progress') {
                            console.log('progress', res.point);

                            mainToRenderer({ type: "m2r:position-progress", progress: res });
                            return;
                        }

                        resolve(res);
                    } catch (error) {
                        console.error('error', error);

                        reject('>>>Faieled to get posiotion.');
                    }
                }
            );
        }
    );
}
