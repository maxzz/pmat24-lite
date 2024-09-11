import fs from "fs";
import { addon } from "./0-addon";
import { type WindowIconGetterParams, type IconFormatType, type WindowIconGetter, type WindowIconGetterResult } from "./pmat-plugin-types";

let gWindowIconGetter: WindowIconGetter | null = null;

export async function getWindowIcon(hwnd: string, iconFormat: IconFormatType = 'png'): Promise<string> {
    if (!gWindowIconGetter) {
        gWindowIconGetter = new addon.WindowIconGetter();
    }

    const params: WindowIconGetterParams = { hwnd, iconFormat };
    const param = JSON.stringify(params);

    return new Promise<string>((resolve, reject) => {
        if (!gWindowIconGetter) {
            throw new Error('no gWindowIconGetter');
        }

        gWindowIconGetter.getWindowIcon(param, (err: any, data: string) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
                //saveIconFile(`test-icon.${iconFormat}`, data); // The icon will go to the root folder of the electron-window-monitor project.
            }
        });
    });
}

function saveIconFile(filename: string, data: string) {
    const obj = JSON.parse(data) as WindowIconGetterResult;
    const iconBinary = base64Decode(obj.data);
    fs.writeFileSync(filename, iconBinary);

    function base64Decode(str: string): Buffer {
        return Buffer.from(str, 'base64');
    }
}
