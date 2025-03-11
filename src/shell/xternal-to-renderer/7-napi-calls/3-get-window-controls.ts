import { addon } from "./0-addon";
import { type WindowControlsCollectorCollectResult, type WindowControlsCollectorCollectParams } from "./pmat-plugin-types";
import { mainStore, mainToRenderer } from "./9-external";
import { errorToString, makeTypedError } from "./9-types-napi-calls";

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
                            reject(makeTypedError('canceled-by-user'));
                            return;
                        }

                        if ('state' in res) {
                            if (mainStore.maxControls !== 0 && res.progress > mainStore.maxControls) {
                                collector.cancel();
                                reject(makeTypedError('too-many-controls', `more then ${mainStore.maxControls}`));
                                return;
                            }

                            //console.log('cb:', JSON.stringify(res));
                            mainToRenderer({ type: 'm2r:detection-progress', progress: res.progress });
                            return;
                        }

                        resolve(str);
                    } catch (error) {
                        reject(makeTypedError('unknown-error', errorToString(error)));
                        mainToRenderer({ type: 'm2r:failed-raw-content', body: str }); //TODO: Do we need this? It's set to atom but not used by client
                    }
                }
            );
        }
    );
}
