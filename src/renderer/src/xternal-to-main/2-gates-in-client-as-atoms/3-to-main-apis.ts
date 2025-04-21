import { R2MInvoke, R2M } from "@shared/ipc-types";
import { worldStore } from "./1-ipc-react-listener";

// main process APIs

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

export function hasMain(): boolean {
    return !!mainApi;
}

// Subscribe to main process calls

mainApi?.setCbCallFromMain((_event: unknown, data: unknown) => worldStore.update(data));

// call

export function sendToMainTyped(data: R2M.AllCalls): void {
    mainApi?.callMain(data);
}

// invoke

export async function invokeMainTyped<TResult>(data: R2MInvoke.AllInvokes): Promise<TResult | undefined> {
    return mainApi?.invokeMain<R2MInvoke.AllInvokes, TResult>(data);
}
