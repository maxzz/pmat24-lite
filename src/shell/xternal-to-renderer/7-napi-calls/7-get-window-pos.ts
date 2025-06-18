import { addon } from "./0-addon";
import { type DragAndDropper, type DragAndDropParams, type DragAndDropResult, type TargetPosition } from "./pmat-plugin-types";
import { mainToRenderer } from "./9-external";

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

        switch (params.what) {
            case 'init': {
                const initParams: DragAndDropParams = params;
                const initParam = JSON.stringify(initParams);

                gDragAndDropper.init(initParam, (err: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
                break;
            }

            // case 'move': {
            //     const moveParams: DragAndDropParams = params;
            //     const moveParam = JSON.stringify(moveParams);

            //     gDragAndDropper.move(moveParam, (err: any, data: string) => {
            //         if (err) {
            //             reject(err);
            //         } else {
            //             try {
            //                 const res = JSON.parse(data) as DragAndDropResult;
            //                 resolve(res);
            //             } catch (error) {
            //                 reject('>>>Faieled to get posiotion.');
            //             }
            //         }
            //     });
            //     break;
            // }

            case 'move':
            case 'stop': {
                gDragAndDropper.stop('', (err: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
                break;
            }
        }
    }
}

export async function test06_dragAndDropTest(hwnd: string) {
        let params: DragAndDropParams = {
            hwnd: hwnd
        };

        const instance = new addon.DragAndDropper();

        instance.init(JSON.stringify(params), (err: any) => {
            if (err) {
                console.error('dragAndDrop init error', err);
            }
            else {
                console.log('dragAndDrop init OK');
            }
        });

        const rv = new Promise<void>((resolve, reject) => {
            let i = 0;

            let moveFunc = () => {
                if (++i < 3) {
                    setTimeout(() => {
                        instance.move('', (err, data) => {
                            if (err) {
                                console.error('dragAndDrop error', err);
                            }
                            else {
                                console.log(data);
                            }
                        });
                        moveFunc();
                    }, 100);
                }
                else {
                    setTimeout(() => {
                        instance.stop('', (err) => {
                            if (err) {
                                console.error('dragAndDrop stop error', err);
                            }
                            else {
                                console.log('dragAndDrop stop OK');
                            }
                        });
                        resolve();
                    }, 100);
                }
            };

            moveFunc();
        });

        return rv;
    }
