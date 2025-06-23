import { addon } from "./0-addon";
import { type WindowExtraParams } from "./pmat-plugin-types";

/**
 * Get top-level Windows information
*/
export async function getWindowExtras(params: WindowExtraParams): Promise<string> { // call 'r2mi:get-window-extras' in main
    return new Promise<string>(
        (resolve, reject) => {
            const paramsStr = JSON.stringify(params);

            addon.getTopLevelWindowsExtraInfo(paramsStr,
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
