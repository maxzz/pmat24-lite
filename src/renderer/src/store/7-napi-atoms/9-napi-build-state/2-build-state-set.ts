import { stateNapiBuildMani, stateNapiAccess } from "./1-build-state-types";

type SetBuildStateParams = {
    progress?: number;          // controls detection progress
    lastProgress?: number;      // last number of build progress or 0
    isRunning?: boolean;        // content check build is runnning
    error: string;              // error message if build failed. It should be set always as empty or error.
    failedBody?: string;        // raw string returned from main that failed to parse
};

export function setBuildState({ progress, lastProgress, isRunning, error, failedBody }: SetBuildStateParams) {
    progress !== undefined && (stateNapiBuildMani.buildCounter = progress);
    lastProgress !== undefined && (stateNapiBuildMani.lastProgress = lastProgress);
    isRunning !== undefined && (stateNapiAccess.buildRunning = isRunning);
    error !== undefined && (stateNapiAccess.buildError = error);
    failedBody !== undefined && (stateNapiAccess.buildFailedBody = failedBody);
}
