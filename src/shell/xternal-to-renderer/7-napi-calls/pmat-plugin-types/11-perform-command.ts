import { type PluginDataCallback } from "./9-types";

export type PerformCommandParams =
    | {
        command: "reloadCache";                 // Command to perform. "reloadCache" is to tell DPAgent to reload cached manifests
    }
    | {
        command: "queryExtension";              // Command to perform. "queryExtension" sends arbitrary string to browser extension
        params: {
            hwnd: string;                       // HWND of the browser window (not used currently, the active browser window is used)
            queryid: string;                    // The query ID is used to identify the query in the response
            query: string;                      // Query string to send. THe string must be passable through stringified JSON
        };
    };

export type ReloadCacheResult = {
};

export type ExtensionExchangeResult = {
    extension_exchange: string;                 // The extension exchange string is returned to the caller
};

export type PerformCommandResult = ReloadCacheResult | ExtensionExchangeResult; // add more with | anotherResult 

export interface PerformCommand {
    (performCommandParams: string, cb: PluginDataCallback<PerformCommandResult>): void;
}

/*
// Query send from DpAgent->extension

export interface GetQueryPmat {                 // Query is comming from PMAT to get extension data.
    queryid: string;                            // This is comming from PMAT for PMAT internal need only
    query: string;                              // The query string is passed to the extension
}

export type mGetQueryPmat = {
    what: 'getquerypmat';                       // Get query from PMAT to extension
    msg: GetQueryPmat;
}

// Reply from extension->DpAgent

export interface GotQueryPmat {                 // The extension reply on PMAT query
    queryid: string;                            // This is comming from PMAT 'getquerypmat'
    forpmat: string;                            // data to tranfest to PMAT
}

export type mGotQueryPmat = {
    what: 'gotquerypmat';                       // Got query from extension to PMAT
    msg: GotQueryPmat;
};
*/
