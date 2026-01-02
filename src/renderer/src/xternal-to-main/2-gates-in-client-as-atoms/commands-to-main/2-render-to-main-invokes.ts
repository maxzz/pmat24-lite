import { type R2MInvokeParams } from "@shared/ipc-types";
import { invokeMainTyped } from "../3-to-main-apis";

export namespace R2MInvokes {

    export async function highlightField(params: R2MInvokeParams.HighlightField | undefined): Promise<string> {
        const rv = await invokeMainTyped({ type: 'r2mi:highlight-field', ...params });
        return rv;
    }

    export async function getZoomLevel(): Promise<number> {
        return invokeMainTyped({ type: 'r2mi:get-zoom-level' });
    }

    export async function getProcessEnv(): Promise<Record<string, string>> {
        return invokeMainTyped({ type: 'r2mi:get-process-env' });
    }

}
