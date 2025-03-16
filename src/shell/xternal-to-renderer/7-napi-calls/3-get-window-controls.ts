import { addon } from "./0-addon";
import { type WindowControlsCollectorCollectResult, type WindowControlsCollectorCollectParams } from "./pmat-plugin-types";
import { mainStore, mainToRenderer } from "./9-external";
import { errorToString, makeTypedError } from "./9-types-napi-error";

export function getWindowControls(hwnd: string): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const params: WindowControlsCollectorCollectParams = { hwnd };
            const param = JSON.stringify(params);

            const collector = new addon.WindowControlsCollector();

            collector.collect(param,
                (err: any, str: string) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    try {
                        const res: WindowControlsCollectorCollectResult = JSON.parse(str);

                        if (mainStore.cancelDetection) {
                            collector.cancel();
                            mainStore.cancelDetection = false;
                            reject(makeTypedError({ error: 'canceled-by-user' }));
                            return;
                        }

                        if ('state' in res) {
                            if (mainStore.maxControls !== 0 && res.progress > mainStore.maxControls) {
                                collector.cancel();
                                reject(makeTypedError({ error: 'too-many-controls', extra: `more then ${mainStore.maxControls}` }));
                                return;
                            }

                            mainToRenderer({ type: 'm2r:detection-progress', progress: res.progress });
                            return;
                        }

                        resolve(str);
                    } catch (error) {
                        reject(makeTypedError({ error: 'unknown-error', extra: errorToString(error) }));
                        mainToRenderer({ type: 'm2r:failed-raw-content', body: str }); //TODO: Do we need this? It's set to atom but not used by client
                    }
                }
            );
        }
    );
}
