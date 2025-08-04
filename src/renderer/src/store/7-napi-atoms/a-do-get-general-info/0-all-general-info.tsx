import { toast } from "sonner";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";

export async function asyncGetAboutInfo(): Promise<string> {
    try {
        const rv = hasMain() ? await invokeMainTyped({ type: 'r2mi:get-general-info' }) : defAbount; // JSON.parse(rv) as GeneralInfoResult
        return rv;
    } catch (error) {
        toast.error(`Cannot get general info: ${error}`);
        return '{}';
    }
}

// Default reply from napi to test wo/ electron:
const defAbount = '{"curVer": "2160128","apiVer":"2250613","templatePath":"","products":[{"product":"Altus AD Workstation","version":"4.1.0.1083"},{"product":"Password Manager","version":"4.1.0.1083"}],"copy":"Copyright � 1996-2025 HID Global Corporation/ASSA ABLOY AB"}';

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

//Products
//Path to templates
//version: api, current
//Copyright
*/
