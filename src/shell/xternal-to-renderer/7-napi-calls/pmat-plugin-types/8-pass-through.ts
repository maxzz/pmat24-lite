import { type PluginDataCallback } from "./9-types";

// Pass through message to PM browser extension

// not call invoke

export type MessageToPm = {
    message: string; // message to send to PM broser extension; this multi-purpose call can be used for training or future customization, and so on
};

export interface SendMessageToPm {
    (MessageToPm: string, cb: PluginDataCallback<any>): void;
}

/*
// Pass through message from PM browser extension (i.e. ext->DpAgent->PMAT)

//TBD: should it be result from be invoke or a separate call from DpAgent?
//  * if extension is not installed, we should not use invoke
//  * it should be a similar call to create manifest fields

export type MessageFromPm = {
    message: string; // message from PM broser extension
};

export interface SendMessageFromPm {
    (MessageFromPm: string, cb: PluginDataCallback<any>): void;
}
*/
