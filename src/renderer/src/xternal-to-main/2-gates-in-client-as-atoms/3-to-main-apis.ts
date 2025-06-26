import { type R2MInvoke, type R2M } from "@shared/ipc-types";
import { worldStore } from "./1-ipc-react-listener";

// main process APIs

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

export function hasMain(): boolean {
    return !!mainApi;
}

// Subscribe to main process calls

mainApi?.setCbCallFromMain((_event: unknown, data: unknown) => worldStore.update(data));

/**
 * Call main process API.
 * The result of calls without main are ignored.
 */
export function sendToMainTyped(data: R2M.AllCalls): void {
    mainApi?.callMain(data);
}

/**
 * Invoke main process API.
 * The result of calls without main can be ignored, but the result of invoke is always expected.
 */
export async function invokeMainTyped<TInvoke extends R2MInvoke.AllInvokes>(data: TInvoke): Promise<R2MInvoke.InvokeResult<TInvoke>> {
    if (!mainApi) {
        throw new Error('no.main.api');
    }
    return mainApi.invokeMain<R2MInvoke.AllInvokes, R2MInvoke.InvokeResult<TInvoke>>(data);
}
