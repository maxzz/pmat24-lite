import { addon } from "./0-addon";
import { errorToString } from "@shell/3-utils-main";
import { makeTypedError } from "./9-types-napi-error";
import { mainStore, mainToRenderer } from "./9-external";
import { type ManifestForWindowCreatorParams, type ManifestForWindowCreatorResult } from "./pmat-plugin-types";

export function getWindowMani(params: ManifestForWindowCreatorParams): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const paramsStr = JSON.stringify(params);

            const collector = new addon.ManifestForWindowCreator();

            collector.create(paramsStr,
                (err: any, str: string) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    try {
                        const res: ManifestForWindowCreatorResult = JSON.parse(str || '{}');

                        if (mainStore.cancelDetection) {
                            collector.cancel();
                            mainStore.cancelDetection = false;
                            reject(makeTypedError({ error: 'canceled-by-user' }));
                            return;
                        }

                        if (res.type === 'progress') {
                            if (mainStore.maxControls !== 0 && res.progress > mainStore.maxControls) {
                                collector.cancel();
                                reject(makeTypedError({ error: 'too-many-controls', extra: `more then ${mainStore.maxControls}` }));
                                return;
                            }

                            mainToRenderer({ type: 'm2r:detection-progress', progress: res.progress });
                            return;
                        }

                        if (res.type === 'error') {
                            reject(makeTypedError({ sub: res.error }));
                            return;
                        }

                        if (res.type === 'data') {
                            resolve(res.xml);
                            return;
                        }

                        reject(makeTypedError({ error: 'build-wo-mani', extra: `${JSON.stringify(res)}` }));
                    } catch (error) {
                        reject(makeTypedError({ error: 'unknown-error', extra: errorToString(error) }));
                        mainToRenderer({ type: 'm2r:failed-raw-content', body: str }); // It's set to the client atom but not used by client
                    }
                }
            );
        }
    );
}
