import { atom } from "jotai";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";
import { type R2MInvoke, type PerformCommandParams } from "@shared/ipc-types";

export const doPerformCommandAtom = atom(
    null,
    async (get, set, params: PerformCommandParams): Promise<R2MInvoke.EmptyOkOrError> => {
        const rv = await performCommand(params);
        return rv;
    }
);

export async function asyncReloadCache(): Promise<R2MInvoke.EmptyOkOrError> {
    const rv = await performCommand({ command: 'reloadCache' });
    return rv;
}

async function performCommand(params: PerformCommandParams): Promise<R2MInvoke.EmptyOkOrError> {
    if (!hasMain()) {
        return '';
    }
    const data = await invokeMainTyped({ type: 'r2mi:perform-command', params });
    if (data) {
        console.log('perform.command.data:', data);
    }
    return data;
}
