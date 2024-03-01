import { createRequire } from 'module'; //console.log(`window-monitor.ts:import.meta.url = "${import.meta.url}"`);
import { AddonTypes } from './pmat-plugin-types';

const require = createRequire(import.meta.url);
export const addon: AddonTypes = require('./plugins/pmat_plugin_nodejs');

// console.log('addon', addon);

export * from './pmat-plugin-types';
export * from './get-target-hwnd';
export * from './get-window-controls';
export * from './get-window-icon';
export * from './get-window-mani';
export * from './highligth-rect';
export * from './get-window-pos';
