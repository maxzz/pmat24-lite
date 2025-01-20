import { addon, type ImageFormatType, type TlwInfo } from '../../../../shell/xternal-to-renderer/7-napi-calls';

export class GetTopLevelWindowTest {
    /// Demonstrates how to use Promise to get top-level Windows information from pmat_plugin_nodejs.node
    async getInfo(): Promise<TlwInfo[]> {
        return new Promise<TlwInfo[]>((resolve: (arg0: TlwInfo[]) => void, reject: (arg0: string) => void) => {
            addon.getTopLevelWindowsInfo('{}', (err: any, data: string) => {
                if (err) {
                    //console.error(err);
                    reject(err);
                }
                else {
                    //console.log(data);
                    let iconContentObj = JSON.parse(data);
                    resolve(iconContentObj);
                }
            });
        });
    }
}

export async function test07_GetTopLevelWindowsInfo() {
    let getter = new GetTopLevelWindowTest();
    let infos = await getter.getInfo();
    return infos;
}


export class GetTopLevelWindowsScreenshotsTest {
    /// Demonstrates how to use Promise to get top-level Windows screenshots from pmat_plugin_nodejs.node
    async getScreenshots(windowsInfos: string): Promise<[Buffer, ImageFormatType]> {
        return new Promise<[Buffer, ImageFormatType]>((resolve: (arg0: [Buffer, ImageFormatType]) => void, reject: (arg0: string) => void) => {
            addon.getTopLevelWindowsScreenshots(windowsInfos, (err: any, data: string) => {
                if (err) {
                    //console.error(err);
                    reject(err);
                }
                else {
                    //console.log(data);
                    let iconContentObj = JSON.parse(data);
                    resolve(iconContentObj);
                }
            });
        });
    }
}

/*
export async function test08_GetTopLevelWindowsScreenshots(windowsInfos: TlwInfo[]) {
    const desiredWidth = 300;
    const imageFormat = "jpg"

    const sHWnds = windowsInfos.map(obj => `"${obj.hwnd}"`).join(',');

    const sParams = `{"hwnd":[${sHWnds}],"imageFormat":"${imageFormat}","width":${desiredWidth}}`;

    let getter = new GetTopLevelWindowsScreenshotsTest();
    let screenshots = await getter.getScreenshots(sParams);

    fs.writeFileSync('TopLevelWindowsScreenshots.json', JSON.stringify(screenshots), 'utf8');
}
*/
