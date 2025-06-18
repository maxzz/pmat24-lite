import { type GetTargetWindow } from "./1-get-target-window";
import { type WindowIconGetter } from "./2-get-icon";
import { type WindowControlsCollector } from "./3-get-controls";
import { type ManifestForWindowCreator } from "./4-get-manifest";
import { type GetTlwInfos } from "./5-get-screenshots";
import { type GetWindowExtras } from "./8-extra-info";
import { type GetTlwScreenshots } from "./5-get-screenshots";
import { type WindowControlHighlighter } from "./6-highlight-control";
import { type WindowHighlighter } from "./6-highlight-window";
import { type DragAndDropper } from "./7-drag-and-drop";

export type AddonTypes = {
    getTargetWindow: GetTargetWindow;
    DragAndDropper: DragAndDropper,
    WindowIconGetter: WindowIconGetter;
    WindowControlsCollector: WindowControlsCollector;
    ManifestForWindowCreator: ManifestForWindowCreator;
    WindowControlHighlighter: WindowControlHighlighter;
    WindowHighlighter: WindowHighlighter;
    getTopLevelWindowsInfo: GetTlwInfos;
    getTopLevelWindowsExtraInfo: GetWindowExtras;
    getTopLevelWindowsScreenshots: GetTlwScreenshots;
};
