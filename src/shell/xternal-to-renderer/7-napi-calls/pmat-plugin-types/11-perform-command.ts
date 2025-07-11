import { type PluginDataCallback } from "./9-types";

export type PerformCommandParams = {
    command: "reloadCache";                     // Command to perform. "reloadCache" is to tell DPAgent to reload cached manifests
    params: undefined;                          // Parameters is not used "reloadCache" 
} | {
    command: "queryExtension";                  // Command to perform. "queryExtension" sends arbitrary string to browser extension
    params: {
        hwnd: string;                           // HWND of the browser window (not used currently, the active browser window is used)
        query: string;                          // Query string to send. THe string must be passable through stringified JSON
    };                          
};

export type ReloadCacheResult = {
};

export type ExtensionExchangeResult = {
    extension_exchange: string;          // The extension exchange string is returned to the caller
};

export type PerformCommandResult = ReloadCacheResult | ExtensionExchangeResult; // add more with | anotherResult 

export interface PerformCommand {
    (performCommandParams: string, cb: PluginDataCallback<PerformCommandResult>): void;
}
