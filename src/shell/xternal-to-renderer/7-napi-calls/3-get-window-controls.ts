import { addon } from "./0-addon";
import { errorToString } from "@shell/3-utils-main";
import { makeTypedError } from "./9-types-napi-error";
import { mainStore, mainToRenderer } from "./9-external";
import { type WindowControlsCollectorCollectResult, type WindowControlsCollectorCollectParams } from "./pmat-plugin-types";

export function getWindowControls(hwnd: string): Promise<string> { // call 'r2mi:get-window-controls' in main
    return new Promise<string>(
        (resolve, reject) => {
            const params: WindowControlsCollectorCollectParams = { hwnd };
            const paramsStr = JSON.stringify(params);

            const collector = new addon.WindowControlsCollector();

            collector.collect(paramsStr,
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
