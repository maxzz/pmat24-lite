import { type PluginDataCallback } from "./9-types";

export type GeneralInfoParams = {};             // There is no parameters for this call

export type GeneralInfoResult = {               // General information about the plugin
    curver: string;                             // Current version of the DPAgent (must match what BrowserExtension expects)
    apiVer: string;                             // API version of the DPAgent (for New PMAT)
    templatePath: string;                       // Path to the network share with template files (Manifests)
    products: [                                 // Installed products
        {
            product: string;
            version: string;
        }
    ],
    copy: string;                               // Copyright information
};

export interface GetGeneralInfo {
    (GeneralInfoParams: string, cb: PluginDataCallback<GeneralInfoResult>): void;
}
