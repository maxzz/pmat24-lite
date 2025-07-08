import { type PluginDataCallback } from "./9-types";

export type GeneralInfoParams = {};             // There is no parameters for this call

export type GeneralInfoResult = {               // General information about the plugin
    curver: string;                             // Current version of the DPAgent
    templatePath: string;                       // Path to the network share with template files (Manifests)
};

export interface GetGeneralInfo {
    (GeneralInfoParams: string, cb: PluginDataCallback<GeneralInfoResult>): void;
}
