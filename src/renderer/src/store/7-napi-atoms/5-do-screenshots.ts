import { atom } from "jotai";
import { invokeMain } from "@/xternal-to-main";
import { type GetTlwScreenshotsParams, type TlwScreenshot } from "@shared/ipc-types";
import { uuid } from "../manifest";
import { toast } from "sonner";
import { proxy } from "valtio";

type TlwScreenshotInfo = {
    item: TlwScreenshot;
    uuid: number;
    editor: {
        selected: boolean;
    };
};

export const screenshotAtom = atom<TlwScreenshotInfo[]>([]);

export const doGetScreenshotsAtom = atom(
    null,
    async (get, set, width: number | undefined): Promise<void> => {
        const tlwInfos: GetTlwScreenshotsParams = {
            imageFormat: 'png',
            width: width || 300,
        };

        const res = await invokeMain<string>({ type: 'r2mi:get-tlw-screenshots', tlwInfos });

        try {
            const screenshots = JSON.parse(res || '{}') as TlwScreenshot[];

            const infos = screenshots.map((item, idx) => {
                if (item.type === 'data') {
                    item.data = `data:image/png;base64,${item.data}`;
                }
                const rv: TlwScreenshotInfo = { item, uuid: uuid.asRelativeNumber(), editor: proxy({ selected: false }) };
                return rv;
            });

            set(screenshotAtom, infos);

            console.log('doGetWindowIconAtom', infos);

        } catch (error) {
            console.error(`'doGetWindowIconAtom' ${error instanceof Error ? error.message : `${error}`}`);
            toast.error(`'doGetWindowIconAtom' ${error instanceof Error ? error.message : `${error}`}`);
            set(screenshotAtom, []);
        }
    }
);
