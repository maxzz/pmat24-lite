import { ThemeMode } from "@/utils";
import { ResizablesState, defaultResizablesState } from "./1-resizables";

export type AppUIOptions = {
    theme: ThemeMode;
    resizablesState: ResizablesState;
};

export const defaultAppUIOptions: AppUIOptions = {
    theme: 'light',
    resizablesState: defaultResizablesState,
};
