import { addon } from "./0-addon";
import { type ManifestForWindowCreatorParams, type ManifestForWindowCreatorResult } from "./pmat-plugin-types";
import { mainStore, mainToRenderer } from "./9-external";
import { errorToString, makeTypedError } from "./9-types-napi-error";

export function getWindowMani(params: ManifestForWindowCreatorParams): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const param = JSON.stringify(params);

            const collector = new addon.ManifestForWindowCreator();

            collector.create(param,
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
                            reject(makeTypedError('canceled-by-user'));
                            return;
                        }

                        if (res.type === 'progress') {
                            if (mainStore.maxControls !== 0 && res.progress > mainStore.maxControls) {
                                collector.cancel();
                                reject(makeTypedError('too-many-controls', `more then ${mainStore.maxControls}`));
                                return;
                            }

                            mainToRenderer({ type: 'm2r:detection-progress', progress: res.progress });
                            return;
                        }

                        if (res.type === 'error') {
                            reject(makeTypedError('build-error', `${res.error}`));
                            return;
                        }

                        if (res.type === 'data') {
                            resolve(res.xml);
                            return;
                        }

                        reject(makeTypedError('build-wo-mani', `${JSON.stringify(res)}`));
                    } catch (error) {
                        reject(makeTypedError('unknown-error', errorToString(error)));
                        mainToRenderer({ type: 'm2r:failed-raw-content', body: str }); // It's set to the client atom but not used by client
                    }
                }
            );
        }
    );
}
