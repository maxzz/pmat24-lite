import { addon } from "./0-addon";
import { type WindowExtraParams } from "./pmat-plugin-types";

/**
 * Get top-level Windows information
*/
export async function getWindowExtras(params: WindowExtraParams) {
    return new Promise<string>(
        (resolve, reject) => {
            const param = JSON.stringify(params);
            const paramsStr = JSON.stringify(params);

            addon.getWindowExtras(paramsStr,
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
