import { napiBuildProgress, napiBuildState } from "./1-build-state-types";

type SetBuildStateParams = {
    progress?: number;          // controls detection progress
    lastProgress?: number;      // last number of build progress or 0
    isRunning?: boolean;        // content check build is runnning
    error: string;              // error message if build failed. It should be set always as empty or error.
    failedBody?: string;        // raw string returned from main that failed to parse
};

export function setBuildState({ progress, lastProgress, isRunning, error, failedBody }: SetBuildStateParams) {
    progress !== undefined && (napiBuildProgress.buildCounter = progress);
    lastProgress !== undefined && (napiBuildProgress.lastProgress = lastProgress);
    isRunning !== undefined && (napiBuildState.buildRunning = isRunning);
    error !== undefined && (napiBuildState.buildError = error);
    failedBody !== undefined && (napiBuildState.buildFailedBody = failedBody);
}
