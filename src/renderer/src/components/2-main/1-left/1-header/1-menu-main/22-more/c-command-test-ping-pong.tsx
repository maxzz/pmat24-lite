import { atom, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { asyncGetTlwInfos, asyncGetWindowExtrasAtom, doPerformCommandAtom } from "@/store/7-napi-atoms";
import { TlwInfo, WindowExtra } from "@shared/ipc-types";

export function MenuItem_TestPingPong() {
    const doPerformCommand = useSetAtom(getBrowserWindowAtom);

    async function onClick() {
        doPerformCommand();
    }

    return (<>
        <DropdownMenuItem onClick={onClick}>
            Command: Test Ping-Pong
        </DropdownMenuItem>
    </>);
}

export async function asyncFindWindowByCaption({ caption, classname }: { caption: string; classname: string; }): Promise<TlwInfo | undefined> {
    const rv = (await asyncGetTlwInfos()).find((item) => item.isBrowser);
    return rv;
}

const getBrowserWindowAtom = atom(
    null,
    async (get, set) => {
        const hwndInfos: TlwInfo[] = (await asyncGetTlwInfos()).filter((item) => item.isBrowser && item.classname === 'Chrome_WidgetWin_1' && !item.caption.includes('DevTools'));
        const hwnds = hwndInfos.map((item) => item.hwnd);

        const { extra } = (await set(asyncGetWindowExtrasAtom, { hwnds }));
        const browserWindow = extra.find((item) => !item.isClosed && item.process === 'msedge.exe');

        console.log('get browser window', { hwndInfos, hwnds, windowExtra: extra, browserWindow });

        if (!browserWindow) {
            console.log('no browser window');
            return;
        }

        console.log('before call to browserWindow:', browserWindow);

        try {
            const res = await set(doPerformCommandAtom, { command: 'queryExtension', params: { hwnd: browserWindow.hwnd, queryid: `${++gQueryid}`, query: `789:${gQueryid}` } });
            console.log('perform.command.res:', res);
        } catch (error) {
            console.error('perform.command.error:', error);
        }

        console.log('after call to browserWindow:', browserWindow);
    }
);

let gQueryid = 0;
