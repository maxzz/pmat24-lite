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

export async function asyncFindWindowByCaption({ caption, classname }: { caption: string; classname: string; }): Promise<TlwInfo | undefined> {
    const rv = (await asyncGetTlwInfos()).find((item) => item.caption === caption && item.classname === classname);
    return rv;
}

export async function asyncFindWindowByHandle({ hwnd }: { hwnd: string; }): Promise<TlwInfo | undefined> {
    const rv = (await asyncGetTlwInfos()).find((item) => item.hwnd === hwnd);
    return rv;
}
