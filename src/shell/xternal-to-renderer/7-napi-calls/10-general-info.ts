import { addon } from "./0-addon";
import { GeneralInfoParams } from "./pmat-plugin-types";

export async function getGeneralInfo() { // call 'r2mi:get-general-info' in main
    return new Promise<string>(
        (resolve, reject) => {
            const params: GeneralInfoParams = {};
            const paramsStr = JSON.stringify(params);

            addon.getGeneralInfo(paramsStr,
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
