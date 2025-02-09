import { napiBuildProgress, napiBuildState } from "../9-napi-build-state";

type SetLocalStateParams = {
    progress?: number;     // controls detection progress
    isRunning?: boolean;   // check if build is runnning
    error?: string;        // error message if build failed
    failedBody?: string;   // raw string returned from main that failed to parse
};

export function setLocalState({ progress, isRunning, error, failedBody }: SetLocalStateParams) {
    progress !== undefined && (napiBuildProgress.buildCounter = progress);
    isRunning !== undefined && (napiBuildState.buildRunning = isRunning);
    error !== undefined && (napiBuildState.buildError = error);
    failedBody !== undefined && (napiBuildState.buildFailedBody = failedBody);
}
