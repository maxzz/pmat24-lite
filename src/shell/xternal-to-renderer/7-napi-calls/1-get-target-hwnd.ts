import { addon } from "./0-addon";
import { type HighlightTargetWindowParams, type GetTargetWindowParams } from "./pmat-plugin-types";

export function getTargetHwnd(): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const params: GetTargetWindowParams = {};
            const param = JSON.stringify(params);

            addon.getTargetWindow(param,
                (err: string, data: string) => err ? reject(err) : resolve(data)
            );
        }
    );
}

export function highlightTargetHwnd(params: HighlightTargetWindowParams): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            const param = JSON.stringify(params);

            addon.highlightTargetWindow(param,
                (err: string, data: string) => err ? reject(err) : resolve(data)
            );
        }
    );
}
