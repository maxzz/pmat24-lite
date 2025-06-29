import { addon } from "./0-addon";
import { type GetTlwScreenshotsParams } from "./pmat-plugin-types";

/**
 * Get top-level Windows screenshots
```
export async function test08_GetTopLevelWindowsScreenshots(windowsInfos: TlwInfo[]) {
    const sHWnds = windowsInfos.map(obj => `"${obj.hwnd}"`).join(',');
    const desiredWidth = 300;
    const imageFormat = "jpg"
    const sParams = `{"hwnd":[${sHWnds}],"imageFormat":"${imageFormat}","width":${desiredWidth}}`;

    let screenshots = await getTopLevelWindowsScreenshots(sParams);
    fs.writeFileSync('TopLevelWindowsScreenshots.json', JSON.stringify(screenshots), 'utf8');
}
```
*/
export async function getTlwScreenshots(params: GetTlwScreenshotsParams): Promise<string> { // call 'r2mi:get-tlw-screenshots' in main
    return new Promise<string>(
        (resolve, reject) => {
            const paramsStr = JSON.stringify(params);

            addon.getTopLevelWindowsScreenshots(paramsStr,
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
