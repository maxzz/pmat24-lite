import { R2MInvoke, R2M } from "@shared/ipc-types";
import { worldStore } from "./ipc-react-listener";

// main process APIs

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

export function hasMain(): boolean {
    return !!mainApi;
}

// Subscribe to main process calls

mainApi?.setCbCallFromMain((_event: unknown, data: unknown) => worldStore.update(data));

// call

export function sendToMain(data: R2M.ToMainCalls): void {
    mainApi?.callMain(data);
}

// invoke

export async function invokeMain<TResult>(data: R2MInvoke.InvokeCalls): Promise<TResult | undefined> {
    return mainApi?.invokeMain<R2MInvoke.InvokeCalls, TResult>(data);
}
