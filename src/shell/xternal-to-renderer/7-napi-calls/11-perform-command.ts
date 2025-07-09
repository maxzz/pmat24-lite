import { addon } from "./0-addon";
import { PerformCommandParams } from "./pmat-plugin-types";

export async function performCommand(params: PerformCommandParams) { // call 'r2mi:perform-command' in main
    return new Promise<string>(
        (resolve, reject,) => {
            const paramsStr = JSON.stringify(params);

            addon.performCommand(paramsStr,
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
