import { type GetTargetWindow } from "./1-get-target-window";
import { type WindowIconGetter } from "./2-get-icon";
import { type WindowControlsCollector } from "./3-get-controls";
import { type ManifestForWindowCreator } from "./4-get-manifest";
import { type GetTlwInfos } from "./5-get-screenshots";
import { type GetTlwScreenshots } from "./5-get-screenshots";
import { type WindowControlHighlighter } from "./6-highlight-control";
import { type DragAndDrop } from "./7-drag-and-drop";
import { type GetWindowExtras } from "./8-extra-info";

export type AddonTypes = {
    getTargetWindow: GetTargetWindow;
    dragAndDrop: DragAndDrop,
    WindowIconGetter: WindowIconGetter;
    WindowControlsCollector: WindowControlsCollector;
    ManifestForWindowCreator: ManifestForWindowCreator;
    WindowControlHighlighter: WindowControlHighlighter;
    getTopLevelWindowsInfo: GetTlwInfos;
    getTopLevelWindowsScreenshots: GetTlwScreenshots;
    getWindowExtras: GetWindowExtras;
};
