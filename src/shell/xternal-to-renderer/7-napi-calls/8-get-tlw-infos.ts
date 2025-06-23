import { addon } from "./0-addon";
import { type GetTlwInfoParams } from "./pmat-plugin-types";

/**
 * Get top-level Windows information
*/
export async function getTlwInfos() { // call 'r2mi:get-tlw-infos' in main
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
