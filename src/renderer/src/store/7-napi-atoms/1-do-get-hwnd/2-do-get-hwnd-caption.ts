import { atom } from "jotai";
import { hasMain } from "@/xternal-to-main";
import { debugSettings } from "@/store/9-ui-state";
import { sawHandleAtom } from "./1-do-get-hwnd";

export const sawHandleCaptionAtom = atom(
    (get) => {
        const { dummyCaption, hwnd } = debugSettings.testCreate;

        if (hasMain() || !dummyCaption) {
            return shortenWindowCaption(get(sawHandleAtom)?.caption);
        }

        let rv = get(sawHandleAtom)?.caption;
        if (hwnd === 'none') {
            rv = '';
        }
        else if (hwnd === 'win32') {
            rv = 'long name C:\\Y\\w\\2-web\\0-dp\\pmat24-lite\\src\\renderer\\src\\store\\7-napi-atoms\\1-do-get-hwnd';
            // rv = 'C:\\Users\\maxzz\\Desktop\\HID bugs\\89863\\temp-for-max\\DigitalPersona Templates Edge\\C\\copies-from-here';
        } else {
            rv = 'short name';
        }
        return rv;
    }
);

/**
 * Shorten caption by removing browser name and flavor like:
 * "Login - Tailwind UI and 2 more pages - Personal - Microsoft​ Edge"
 * to 'Login - Tailwind UI and 2 more pages'
 * Note on Microsoft Edge: There is hidden unicode character 'E2 80 8B' ("ZERO-WIDTH SPACE") afer 't' : " - Microsoft​ Edge'"
 * @param caption 
 * @returns 
 */
function shortenWindowCaption(caption: string | undefined) {
    let rv = caption || '';
    if (rv) {
        rv = rv.replace(/ - Google Chrome$/g, '');
        rv = rv.replace(/ - Microsoft.? Edge$/g, '');
        rv = rv.replace(/ - Personal$/g, '');
        // rv = rv.length > 30 ? `${rv.substring(0, 30)}...` : rv;
    }
    return rv;
}
