import { invokeMainTyped } from "@/xternal-to-main";

export async function execFile(fileName: string): Promise<string | undefined> {
    return await invokeMainTyped({ type: 'r2mi:exec-file', fileName });
}
