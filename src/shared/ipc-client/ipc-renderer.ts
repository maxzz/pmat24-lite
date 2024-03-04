import { M4RInvoke, M4R } from "@shared/ipc-types";
import { worldStore } from "./ipc-react-listener";

// main process APIs

var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

export function hasMain(): boolean {
    return !!mainApi;
}

// Subscribe to main process calls

mainApi?.setCbCallFromMain((_event: unknown, data: unknown) => worldStore.update(data));

// call

export function sendToMain(data: M4R.ToMainCalls): void {
    mainApi?.callMain(data);
}

// invoke

export async function invokeMain<TResult>(data: M4RInvoke.InvokeCalls): Promise<TResult | undefined> {
    return mainApi?.invokeMain<M4RInvoke.InvokeCalls, TResult>(data);
}

export function invokeLoadFiles(filenames: string[], allowedExt?: string[]): Promise<M4RInvoke.FileContent[]> {
    const d: M4RInvoke.InvokeCalls = {
        type: 'r2mi:load-files',
        filenames,
        ...(allowedExt && { allowedExt }),
    };
    return mainApi?.invokeMain(d) as Promise<M4RInvoke.FileContent[]>;
}
