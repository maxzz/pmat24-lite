export type ElectronState = {
    maxControls: number;
    cancelDetection: boolean; // set by client and reset by main
    sawModeIsOn: boolean;
}

export const electronState: ElectronState = {
    maxControls: 0,
    cancelDetection: false,
    sawModeIsOn: false,
}

//

export type SessionState = {
    hasChanges: boolean;
};

export const sessionState: SessionState = {
    hasChanges: false,
};
