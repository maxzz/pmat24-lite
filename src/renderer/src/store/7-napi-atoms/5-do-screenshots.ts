import { atom } from "jotai";
import { invokeMain } from "@/xternal-to-main";
import { type GetTlwScreenshotsParams, type TlwScreenshot } from "@shared/ipc-types";

export const screenshotAtom = atom<TlwScreenshot[]>([]);

export const doGetScreenshotsAtom = atom(
    null,
    async (get, set, width: number | undefined): Promise<void> => {
        const tlwInfos: GetTlwScreenshotsParams = {
            imageFormat: 'png',
            width: width || 300,
        };

        const res = await invokeMain<string>({ type: 'r2mi:get-tlw-screenshots', tlwInfos });

        try {
            const arr = JSON.parse(res || '{}') as TlwScreenshot[];

            if (arr.length === 0) {
                return;
                //TODO: show error in UI
            }

            arr.forEach(
                (item) => {
                    if (item.type === 'data') {
                        item.data = `data:image/png;base64,${item.data}`; //TODO this should be done in plugin
                    }
                }
            );

            set(screenshotAtom, arr);
            
            console.log('doGetWindowIconAtom', arr);

        } catch (error) {
            console.error(`'doGetWindowIconAtom' ${error instanceof Error ? error.message : `${error}`}`);
            
            //TODO: show error in UI
        }
    }
);
