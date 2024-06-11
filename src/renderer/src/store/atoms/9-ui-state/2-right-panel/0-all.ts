import { RightPanelView, defaultRightPanelView } from "./1-right-panel-view";
import { MainViewSettings, defaultMainViewSettings } from "./2-mani-view/0-all";


export type RightPanelSettings = RightPanelView & MainViewSettings;

export const defaultRightPanelSettings: RightPanelSettings = {
    ...defaultRightPanelView,
    ...defaultMainViewSettings,
};
