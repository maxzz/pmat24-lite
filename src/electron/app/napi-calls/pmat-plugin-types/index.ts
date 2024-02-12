import { WindowControlHighlighter } from './highlight-control';
import { dragAndDrop } from './drag-and-drop';
import { WindowControlsCollector } from './get-controls';
import { WindowIconGetter } from './get-icon';
import { ManifestForWindowCreator } from './get-manifest';
import { getTargetWindow } from './get-target-window';

export type PluginDataCallback = (err: string, data: string) => void;
export type PluginErrorCallback = (err: string) => void;

export * from './get-target-window';
export * from './drag-and-drop';
export * from './get-icon';
export * from './highlight-control';
export * from './get-controls';
export * from './get-manifest';

export type AddonTypes = {
    getTargetWindow: getTargetWindow;
    dragAndDrop: dragAndDrop,
    WindowIconGetter: WindowIconGetter;
    WindowControlsCollector: WindowControlsCollector;
    ManifestForWindowCreator: ManifestForWindowCreator;
    WindowControlHighlighter: WindowControlHighlighter;
};
