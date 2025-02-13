import { napiBuildProgress, napiBuildState } from "../9-napi-build-state";

type SetLocalStateParams = {
    progress?: number;          // controls detection progress
    lastProgress?: number;      // last number of build progress or 0
    isRunning?: boolean;        // content check build is runnning
    error?: string;             // error message if build failed
    failedBody?: string;        // raw string returned from main that failed to parse
};

export function setLocalState({ progress, lastProgress, isRunning, error, failedBody }: SetLocalStateParams) {
    lastProgress !== undefined && (napiBuildProgress.lastProgress = lastProgress);
    progress !== undefined && (napiBuildProgress.buildCounter = progress);
    isRunning !== undefined && (napiBuildState.buildRunning = isRunning);
    error !== undefined && (napiBuildState.buildError = error);
    failedBody !== undefined && (napiBuildState.buildFailedBody = failedBody);
}
