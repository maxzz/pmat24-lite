import { addon } from "./0-addon";
import { type GetTlwInfoParams, type GetTlwScreenshotsParams } from "./pmat-plugin-types";

/**
 * Get top-level Windows information
 */
export async function getTlwInfos() {
    return new Promise<string>(
        (resolve, reject) => {
            const params: GetTlwInfoParams = {};
            const paramsStr = JSON.stringify(params);

            addon.getTopLevelWindowsInfo(paramsStr,
                (err: string, data: string) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                }
            );
        }
    );
}
/*
export async function test07_GetTopLevelWindowsInfo() {
    let infos = await getTopLevelWindowsInfo();
    return infos;
}
*/

/**
 * Get top-level Windows screenshots
 */
export async function getTlwScreenshots(params: GetTlwScreenshotsParams): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const param = JSON.stringify(params);

            addon.getTopLevelWindowsScreenshots(param,
                (err: string, data: string) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                }
            );

        }
    );
}
/*
export async function test08_GetTopLevelWindowsScreenshots(windowsInfos: TlwInfo[]) {
    const sHWnds = windowsInfos.map(obj => `"${obj.hwnd}"`).join(',');

    const desiredWidth = 300;
    const imageFormat = "jpg"
    const sParams = `{"hwnd":[${sHWnds}],"imageFormat":"${imageFormat}","width":${desiredWidth}}`;

    let screenshots = await getTopLevelWindowsScreenshots(sParams);

    fs.writeFileSync('TopLevelWindowsScreenshots.json', JSON.stringify(screenshots), 'utf8');
}
*/
