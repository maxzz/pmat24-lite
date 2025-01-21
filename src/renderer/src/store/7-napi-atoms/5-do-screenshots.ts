import { atom, type Setter } from "jotai";
import { proxy } from "valtio";
import { hasMain, invokeMain } from "@/xternal-to-main";
import { type GetTlwScreenshotsParams, type TlwScreenshot } from "@shared/ipc-types";
import { uuid } from "../manifest";
import { toast } from "sonner";
// import replyTest from "@/assets/tests/25.01.16.25/TopLevelWindowsScreenshots.json";
import replyTest from "@/assets/tests/25.01.16.25/TopLevelWindowsScreenshots2many.json";

export type TlwScreenshotInfo = {
    item: TlwScreenshot;
    uuid: number;
    editor: {
        selected: boolean;
    };
};

export const allScreenshotAtom = atom<TlwScreenshotInfo[]>([]);

export const doSetScreenshotsAtom = atom(
    null,
    async (get, set, width: number | undefined): Promise<void> => {
        if (hasMain()) {
            set(doCollectScreenshotsAtom, width);
        } else {
            set(doTestScreenshotsAtom, width);
        }
    }
);

const doCollectScreenshotsAtom = atom(
    null,
    async (get, set, width: number | undefined): Promise<void> => {
        const tlwInfos: GetTlwScreenshotsParams = {
            imageFormat: 'png',
            width: width || 300,
        };

        const res = await invokeMain<string>({ type: 'r2mi:get-tlw-screenshots', tlwInfos });

        const screenshots = JSON.parse(res || '{}') as TlwScreenshot[];

        setScreenshots(screenshots, set);
    }
);

const doTestScreenshotsAtom = atom(
    null,
    async (get, set, width: number | undefined): Promise<void> => {
        const screenshots = replyTest as TlwScreenshot[];

        setScreenshots(screenshots, set);
    }
);

function setScreenshots(screenshots: TlwScreenshot[], set: Setter) {
    try {
        const infos = screenshots.map((item, idx) => {
            if (item.type === 'data') {
                item.data = `data:image/png;base64,${item.data}`;
            }
            const rv: TlwScreenshotInfo = { item, uuid: uuid.asRelativeNumber(), editor: proxy({ selected: false }) };
            return rv;
        });

        set(allScreenshotAtom, infos);

        console.log('doGetWindowIconAtom', infos);

    } catch (error) {
        console.error(`'doGetWindowIconAtom' ${error instanceof Error ? error.message : `${error}`}`);
        toast.error(`'doGetWindowIconAtom' ${error instanceof Error ? error.message : `${error}`}`);
        set(allScreenshotAtom, []);
    }
}
