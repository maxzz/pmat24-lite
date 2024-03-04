import { createRequire } from 'module'; //console.log(`window-monitor.ts:import.meta.url = "${import.meta.url}"`);
import { AddonTypes } from './pmat-plugin-types';

export const require2 = createRequire(import.meta.url);
export const addon: AddonTypes = require2('../plugins/pmat_plugin_nodejs.node'); // out/plugins/pmat_plugin_nodejs.node

export * from './pmat-plugin-types';
export * from './get-target-hwnd';
export * from './get-window-controls';
export * from './get-window-icon';
export * from './get-window-mani';
export * from './highligth-rect';
export * from './get-window-pos';

export function getElectronModulePaths() {
    const rv = JSON.stringify({ requireCache: require2.cache, addonKeys: Object.keys(addon) });
    return rv;
}
