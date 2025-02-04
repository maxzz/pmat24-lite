import { atom, type Getter, type Setter } from "jotai";
import { proxy } from "valtio";
import { hasMain, invokeMain } from "@/xternal-to-main";
import { GetTlwInfoResult, type TlwInfo, type GetTlwScreenshotsParams, type TlwScreenshot } from "@shared/ipc-types";
import { uuid } from "../manifest";
import { toast } from "sonner";
// import TEST_SCREENSHOTS from "@/assets/tests/25.01.16.25/TopLevelWindowsScreenshots.json";
import TEST_SCREENSHOTS from "@/assets/tests/25.01.16.25/TopLevelWindowsScreenshots2many.json";

export type TlwScreenshotInfo = {
    item: TlwScreenshot;
    uuid: number;
    editor: {
        selected: boolean;
    };
};

export const allScreenshotAtom = atom<TlwScreenshotInfo[]>([]);

/**
 * @param hwnd - optional, if provided this this will be window handle to select
 * @param width - max screenshot width, height - auto
 */
export const doSetScreenshotsAtom = atom(
    null,
    async (get, set, { width }: { width: number | undefined; }): Promise<void> => {
        if (hasMain()) {
            await doCollectScreenshotsAtom(width, set);
        } else {
            await doTestScreenshotsAtom(width, set);
        }
    }
);

async function doCollectScreenshotsAtom(width: number | undefined, set: Setter) {
    try {
        const infosStr = await invokeMain<string>({ type: 'r2mi:get-tlw-infos' });
        const infos = JSON.parse(infosStr || '[]') as TlwInfo[];
        const hwnds = infos.map(obj => obj.hwnd);

        const tlwInfos: GetTlwScreenshotsParams = {
            imageFormat: 'png',
            width: width || 300,
            hwnd: hwnds,
        };

        const res = await invokeMain<string>({ type: 'r2mi:get-tlw-screenshots', tlwInfos });
        const screenshots = JSON.parse(res || '{}') as TlwScreenshot[];

        setScreenshotsWithExtra(screenshots, set);
    } catch (error) {
        console.error(`'doCollectScreenshotsAtom' ${error instanceof Error ? error.message : `${error}`}`);
        toast.error(`'doCollectScreenshotsAtom' ${error instanceof Error ? error.message : `${error}`}`);
        set(allScreenshotAtom, []);
    }
}

//TODO: From doCollectScreenshotsAtom TlwInfo[] is returned instead of GetTlwInfoResult 
//TODO: hwnd [] should be optional for get-tlw-infos
//TODO: windows list is updated during a few calls refresh
//TODO: for error we need to have error reason
//TODO: exclude PMAT windows from the returned list
//TODO: after clicking refresh a couple of times, debug_heap.cpp exception at line 904, and that will crash the app
//TODO: for const tlwInfos: GetTlwScreenshotsParams I asked png but got jpg (see setScreenshotsWithExtra() where I set the type to png)
//TODO: during refresh app is showing a yellow frame. What is it?

// This is how it should be done
// async function doCollectScreenshotsAtom(width: number | undefined, set: Setter) {
//     try {
//         const tlwInfos: GetTlwScreenshotsParams = {
//             imageFormat: 'png',
//             width: width || 300,
//         };

//         const res = await invokeMain<string>({ type: 'r2mi:get-tlw-screenshots', tlwInfos });
//         const screenshots = JSON.parse(res || '{}') as TlwScreenshot[];

//         setScreenshotsWithExtra(screenshots, set);
//     } catch (error) {
//         console.error(`'doGetWindowIconAtom' ${error instanceof Error ? error.message : `${error}`}`);
//         toast.error(`'doGetWindowIconAtom' ${error instanceof Error ? error.message : `${error}`}`);
//         set(allScreenshotAtom, []);
//     }
// }

async function doTestScreenshotsAtom(width: number | undefined, set: Setter) {
    const screenshots = TEST_SCREENSHOTS as TlwScreenshot[];
    setScreenshotsWithExtra(screenshots, set);
}

function setScreenshotsWithExtra(screenshots: TlwScreenshot[], set: Setter) {
    const infos = screenshots.map((item, idx) => {
        const newItem: TlwScreenshot = { ...item };
        if (newItem.type === 'data') {
            // newItem.data = `data:image/png;base64,${newItem.data}`;
            newItem.data = `data:image/${newItem.format};base64,${newItem.data}`;
        }
        const rv: TlwScreenshotInfo = { item: newItem, uuid: uuid.asRelativeNumber(), editor: proxy({ selected: false }) };
        return rv;
    });

    set(allScreenshotAtom, infos);
    //console.log('doGetWindowIconAtom', infos);

    printScreenshots(screenshots);
}

function printScreenshots(screenshots: TlwScreenshot[]) {
    const items = screenshots.map(item => {
        if (item.type === 'data') {
            const newItem: Partial<TlwScreenshot> = { ...item };
            newItem.data = item.data.substring(0, 25);
            return newItem;
        }
        return item;
    });

    console.log(`Screenshots`, JSON.stringify(items, null, 2));
}
