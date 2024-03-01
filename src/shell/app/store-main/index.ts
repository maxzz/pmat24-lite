export type MainStore = {
    maxControls: number;
    cancelDetection: boolean; // set by client and reset by main
}

export const mainStore: MainStore = {
    maxControls: 0,
    cancelDetection: false,
}
