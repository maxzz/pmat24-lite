import { errorToString } from "@/utils";
import { type TlwInfo } from "@shared/ipc-types";
import { invokeMainTyped } from "@/xternal-to-main";

export async function asyncGetTlwInfos(): Promise<TlwInfo[]> {
    try {
        const infosStr = await invokeMainTyped({ type: 'r2mi:get-tlw-infos' });
        const infos = JSON.parse(infosStr || '[]') as TlwInfo[];

        //console.log(`Infos`, JSON.stringify(infos, null, 2));
        return infos;
    } catch (error) {
        console.error(`'doCollectScreenshotsAtom' ${errorToString(error)}`);
        return [];
    }
}
