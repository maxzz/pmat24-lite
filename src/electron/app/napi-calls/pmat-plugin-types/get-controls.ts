import { PluginDataCallback } from ".";

// Get Controls

export type WindowControlsCollectorCollectParams = {
    hwnd: string;
};

export type WindowControlsCollectProgress = {
    state: 'start' | 'progress' | 'done';
    progress: number;
};

export type WindowControlsCollectFinal = {
    pool: string;
    controls: string[];
};

export type WindowControlsCollectorCollectResult = WindowControlsCollectProgress | WindowControlsCollectFinal;

export interface WindowControlsCollector {
    new(): WindowControlsCollector;
    collect(windowControlsCollectorCollectParams: string, cb: PluginDataCallback): void;
    cancel(): void;
}

export type EngineControl = {
    type: string;
    dispname: string;
    formname: string;
    path: string;
    memvalue: string;
    choosevalues: string[];

    memid: number;
    orderid: number;

    topurl: string;
    parenturl: string;

    hintfromengineuseit: boolean;
    mfillin_useunicode: boolean;
    mfillin_wrapkeystate: boolean;
};

export type WindowControlsCollectFinalAfterParse = {
    pool: string;
    controls: EngineControl[];
};
