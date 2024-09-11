import { type AddonTypes } from "./pmat-plugin-types";
import { createRequire } from "module"; //console.log(`window-monitor.ts:import.meta.url = "${import.meta.url}"`);

export const require2 = createRequire(import.meta.url);
export const addon: AddonTypes = require2("../plugins/pmat_plugin_nodejs.node"); // out/plugins/pmat_plugin_nodejs.node

export function getElectronModulePaths() {
    const rv = JSON.stringify({ requireCache: require2.cache, addonKeys: Object.keys(addon) });
    return rv;
}
