import { type PluginDataCallback } from "./9-types";

export type PerformCommandParams = {   // 
    command: string;                   // Command to perform. Currently defined commands: "reloadCache" (no parameters)
    params: any;                       // Parameters for the command, content depends on the command.
}

export type PerformCommandOutput = {   // 
}

export interface PerformCommand {
    (performCommandParams: string, cb: PluginDataCallback<PerformCommandOutput>): void;
}
