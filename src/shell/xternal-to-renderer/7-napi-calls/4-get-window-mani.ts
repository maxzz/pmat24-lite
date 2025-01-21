import { addon } from "./0-addon";
import { type ManifestForWindowCreatorParams, type ManifestForWindowCreatorResult } from "./pmat-plugin-types";
import { mainStore, mainToRenderer } from "./9-external";

export function getWindowMani(hwnd: string, wantXml: boolean): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const params: ManifestForWindowCreatorParams = { hwnd, wantXml, };
            const param = JSON.stringify(params);

            const collector = new addon.ManifestForWindowCreator();

            collector.create(param,
                (err: any, str: string) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    //console.log(`parse collector:\n>>>\n${str}\n<<<`);

                    try {
                        const isFinalResultXml = wantXml && str.charAt(0) === '<'; // otherwise it's progress
                        if (isFinalResultXml) {
                            resolve(str);
                            return;
                        }

                        const res: Exclude<ManifestForWindowCreatorResult, string> = JSON.parse(str);

                        if (mainStore.cancelDetection) {
                            collector.cancel();
                            mainStore.cancelDetection = false;
                            reject(`>>>Canceled by user`);
                            return;
                        }

                        if ('state' in res) {
                            if (mainStore.maxControls !== 0 && res.progress > mainStore.maxControls) {
                                collector.cancel();
                                reject(`>>>Too many controls (more then ${mainStore.maxControls})`);
                                return;
                            }

                            mainToRenderer({ type: 'm2r:detection-progress', progress: res.progress });
                            return;
                        }

                        resolve(str);
                        //console.log('final:', JSON.stringify(res));
                    } catch (error) {
                        const msg = `>>>${error instanceof Error ? error.message : `${error}`}`;
                        reject(msg);
                        mainToRenderer({ type: 'm2r:failed-raw-content', body: str });
                    }
                }
            );
        }
    );
}
