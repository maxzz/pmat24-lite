import { atom, type Getter, type Setter } from "jotai";
import { proxy } from "valtio";
import { toast } from "sonner";
import { uuid } from "../../manifest";
import { debugSettings } from "@/store/1-atoms/9-ui-state";
import { hasMain, invokeMain } from "@/xternal-to-main";
import { type GetTlwInfoResult, type TlwInfo, type GetTlwScreenshotsParams, type TlwScreenshot } from "@shared/ipc-types";
import { doLoadFakeScreensAtom } from "../8-create-mani-tests-w-fetch";
import { napiBuildState } from "../9-napi-build-state";

export type TlwScreenshotInfo = {
    item: TlwScreenshot;
    uuid: number;
    editor: {
        selected: boolean;
    };
};

export const allScreenshotAtom = atom<TlwScreenshotInfo[]>([]);

export const defaultScreenshotWidth = 400;

/**
 * @param hwnd - optional, if provided this this will be window handle to select
 * @param width - max screenshot width, height - auto
 */
export const doSetScreenshotsAtom = atom(
    null,
    async (get, set, { width }: { width: number | undefined; }): Promise<void> => {
        width = width || defaultScreenshotWidth;

        if (napiBuildState.buildRunning) {
            return;
        }

        if (hasMain()) {
            await doLiveScreenshots(width, set);
        } else {
            await doTestScreenshots(get, set);
        }

        napiBuildState.buildRunning = false;
    }
);

async function doLiveScreenshots(width: number, set: Setter) {
    try {
        // 1. get all tlw infos
        const infosStr = await invokeMain<string>({ type: 'r2mi:get-tlw-infos' });
        const infos = JSON.parse(infosStr || '[]') as TlwInfo[];
        const hwnds = infos.map(obj => obj.hwnd);

        console.log(`Infos`, JSON.stringify(infos, null, 2));

        const tlwInfos: GetTlwScreenshotsParams = {
            imageFormat: 'png',
            width: width,
            hwnd: hwnds,
        };

        // 2. get all tlw screenshots
        const res = await invokeMain<string>({ type: 'r2mi:get-tlw-screenshots', tlwInfos });
        let screenshots = JSON.parse(res || '{}') as TlwScreenshot[];

        screenshots = correlateScreenshotsOrder(infos, screenshots);

        printScreenshots(screenshots);

        set(allScreenshotAtom, addScreenshotsExtra(screenshots));
    } catch (error) {
        console.error(`'doCollectScreenshotsAtom' ${error instanceof Error ? error.message : `${error}`}`);
        toast.error(`'doCollectScreenshotsAtom' ${error instanceof Error ? error.message : `${error}`}`);
        set(allScreenshotAtom, []);
    }
}

function correlateScreenshotsOrder(tlwInfos: TlwInfo[], screenshots: TlwScreenshot[]): TlwScreenshot[] {
    const rv: TlwScreenshot[] = []; //tlwInfos.forEach((tlwInfo, idx) => tlwInfo.hwnd.length < 16 && (tlwInfo.hwnd = `0x${tlwInfo.hwnd.substring(2).padStart(16, '0')}`)); // Fix error: 'Could not find 0x240852 in 0x0000000000240852'

    tlwInfos.forEach(
        (tlwInfo) => {
            const screenshotItem = screenshots.find(screenshot => screenshot.hwnd === tlwInfo.hwnd);
            if (screenshotItem) {
                rv.push(screenshotItem);
            } else {
                console.log(`%cMissing '${tlwInfo.hwnd}' in screenshots [${screenshots.map(screenshot => `'${screenshot.hwnd}'`).join(', ')}]`, 'color: red');
            }
        }
    );

    return rv;
}

//TODO: From doCollectScreenshotsAtom TlwInfo[] is returned instead of GetTlwInfoResult 
//TODO: hwnd [] should be optional for get-tlw-infos
//TODO: windows list is updated during a few calls refresh (maybe sort them? but anyway why this is happening?)
//TODO: for error we need to have error reason
//TODO: exclude PMAT windows from the returned list

//TODO: after clicking refresh a couple of times, debug_heap.cpp exception at line 904, and that will crash the app
//TODO: who will watch reentrancy? plugin or UI? I think it should be plugin.

//TODO: for const tlwInfos: GetTlwScreenshotsParams I asked png but got jpg (see setScreenshotsWithExtra() where I set the type to png)
//TODO: during refresh app is showing a yellow frame. What is it?

//TODO: error should include caption

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

async function doTestScreenshots(get: Getter, set: Setter) {
    const screen = debugSettings.testCreate.screen;
    const screenshots = await set(doLoadFakeScreensAtom, screen);

    set(allScreenshotAtom, addScreenshotsExtra(screenshots));
}

function addScreenshotsExtra(screenshots: TlwScreenshot[]): TlwScreenshotInfo[] {
    const infos = screenshots.map(
        (item, idx) => {
            const newItem: TlwScreenshot = { ...item };
            if (newItem.type === 'data') {
                newItem.data = `data:image/${newItem.format};base64,${newItem.data}`;
            }
            const rv: TlwScreenshotInfo = {
                item: newItem,
                uuid: uuid.asRelativeNumber(),
                editor: proxy({ selected: false }),
            };
            return rv;
        }
    );
    return infos;
}

function printScreenshots(screenshots: TlwScreenshot[]) {
    const lines: string[] = [];

    screenshots.forEach(
        (item, idx) => {
            const idxStr = `${idx + 1}`.padStart(2, ' ');

            if (item.type === 'error') {
                lines.push(`${idxStr}. type: ${item.type} hwnd: ${item.hwnd} errorCode: ${item.errorCode}`);
                return;
            } else if (item.type === 'data') {
                lines.push(`${idxStr}. hwnd:${item.hwnd} ${item.format} ${`${item.width}`.padStart(4, ' ')} x ${`${item.height}`.padEnd(4, ' ')} img:'${item.data?.substring(0, 7)}...' caption: '${item.caption}'`);
                return;
            }

            lines.push('undefined');
        }
    );

    console.log(`Screenshots`, JSON.stringify(lines, null, 2));
};
