import { type PluginDataCallback } from "./9-types";

export type PerformCommandParams = {
    command: "reloadCache";                     // Command to perform. Currently defined commands: "reloadCache" (no parameters)
    params: any;                                // Parameters for the command, content depends on the command.
};

export type ReloadCacheResult = {
};

export type PerformCommandResult = ReloadCacheResult; // add more with | anotherResult 

export interface PerformCommand {
    (performCommandParams: string, cb: PluginDataCallback<PerformCommandResult>): void;
}
