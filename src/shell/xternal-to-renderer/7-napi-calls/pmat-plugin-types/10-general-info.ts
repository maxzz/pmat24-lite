import { type PluginDataCallback } from "./9-types";

export type GeneralInfo = {        // General information about the plugin
    curver: string;                // Current version of the DPAgent
    templatePath: string;          // Path to the network share with template files (Manifests)
}

export interface GetGeneralInfo {
    (highlightTargetWindowParams: string, cb: PluginDataCallback<GeneralInfo>): void;
}
