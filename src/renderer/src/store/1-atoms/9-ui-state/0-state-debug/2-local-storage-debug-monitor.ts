export type DebugMonitorState = {
    maxControls: number;        // max # of controls before detection canceled. 0 is unlimited
    acquireXml: boolean;
    iconAutoUpdate: boolean;    // get window icon automatically
    iconsLarge: boolean;        // show large icon of the target window
};

export const initialDebugMonitorState: DebugMonitorState = {
    maxControls: 0,
    acquireXml: false,
    iconAutoUpdate: true,
    iconsLarge: false,
};
