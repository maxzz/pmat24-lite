import { type FceItem } from "./9-types";

// For debugging

export function mruToString(items: FceItem[]) {
    return JSON.stringify(items.map((item) => `${JSON.stringify(item)}\n`), null, 4);
    //console.log('buildMruWItem', `\n${JSON.stringify(item)}\n\n`, mruToString(rv));
}
