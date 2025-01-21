import { atom } from "jotai";
import { invokeMain } from "@/xternal-to-main";
import { type GetTlwScreenshotsResult, type GetTlwScreenshotsParams } from "@shared/ipc-types";

export const doGetScreenshotsAtom = atom(
    null,
    async (get, set, width: number | undefined): Promise<void> => {
        const tlwInfos: GetTlwScreenshotsParams = {
            imageFormat: 'png',
            width: width || 300,
        };

        const res = await invokeMain<string>({ type: 'r2mi:get-tlw-screenshots', tlwInfos });

        const arr = JSON.parse(res || '{}') as GetTlwScreenshotsResult;
        
        console.log('doGetWindowIconAtom', arr);
    }
);
