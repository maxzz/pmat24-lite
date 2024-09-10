import { type WindowControlHighlighter } from './6-highlight-control';
import { type dragAndDrop } from './7-drag-and-drop';
import { type WindowControlsCollector } from './3-get-controls';
import { type WindowIconGetter } from './2-get-icon';
import { type ManifestForWindowCreator } from './4-get-manifest';
import { type getTargetWindow } from './1-get-target-window';

export type AddonTypes = {
    getTargetWindow: getTargetWindow;
    dragAndDrop: dragAndDrop,
    WindowIconGetter: WindowIconGetter;
    WindowControlsCollector: WindowControlsCollector;
    ManifestForWindowCreator: ManifestForWindowCreator;
    WindowControlHighlighter: WindowControlHighlighter;
};
