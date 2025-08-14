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
    const error = await invokeMainTyped({ type: 'r2mi:perform-command', params });
    if (error) {
        console.log('perform.command.error:', error);
    }
    return error;
}
