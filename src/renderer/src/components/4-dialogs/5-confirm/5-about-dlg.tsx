import { atom } from "jotai";
import { hasMain } from "@/xternal-to-main";
import { aboutMessages, doAsyncConfirmDialogAtom } from "@/store/1-atoms/7-dialogs";
import { doGetGeneralInfoAtom } from "@/store/7-napi-atoms";
import { AlertOctagon } from "lucide-react";

export const doAboutDialogAtom = atom(null,
    async (get, set) => {
        const rv = hasMain() ? await set(doGetGeneralInfoAtom) : defAbount;

        const message = FormattedJson({ json: rv });

        const ui = { ...aboutMessages, message };
        await set(doAsyncConfirmDialogAtom, ui);
    }
);

// Default reply from napi to test wo/ electron:
const defAbount = "{\"curVer\": \"2160128\",\"apiVer\":\"2250613\",\"templatePath\":\"\",\"products\":[{\"product\":\"Altus AD Workstation\",\"version\":\"4.1.0.1083\"},{\"product\":\"Password Manager\",\"version\":\"4.1.0.1083\"}],\"copy\":\"Copyright � 1996-2025 HID Global Corporation/ASSA ABLOY AB\"}";

function FormattedJson({ json }: { json: string; }) {
    try {
        const rvObj = JSON.parse('');
        const rv = (
            <div className="text-xs">
                <div className="whitespace-pre">
                    {JSON.stringify(rvObj, null, 4)}
                </div>
            </div>
        );
        return rv;
    } catch (error) {
        return (
            <div className="text-xs flex items-center gap-x-2">
                <AlertOctagon className="size-6 text-red-500" />
                Cannot get information about installed applications
            </div>
        );
    }
}
/*
{
    "curVer": "2160128",
    "apiVer": "2250613",
    "templatePath": "",
    "products": [
        {
            "product": "Altus AD Workstation",
            "version": "4.1.0.1083"
        },
        {
            "product": "Password Manager",
            "version": "4.1.0.1083"
        }
    ],
    "copy": "Copyright � 1996-2025 HID Global Corporation/ASSA ABLOY AB"
}
*/

//Products
//Path to templates
//version: api, current
//Copyright
