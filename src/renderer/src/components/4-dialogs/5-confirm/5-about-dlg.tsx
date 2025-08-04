import { atom } from "jotai";
import { classNames } from "@/utils";
import { Textarea } from "@/ui/shadcn";
import { inputRingClasses } from "@/ui/local-ui";
import { AlertOctagon } from "lucide-react";
import { hasMain } from "@/xternal-to-main";
import { aboutMessages, doAsyncConfirmDialogAtom } from "@/store/1-atoms/7-dialogs";
import { doGetGeneralInfoAtom } from "@/store/7-napi-atoms";
import { type GeneralInfoResult } from "@shared/ipc-types";

export const doAboutDialogAtom = atom(null,
    async (get, set) => {
        const rv = hasMain() ? await set(doGetGeneralInfoAtom) : defAbount;
        const message = FormattedJson({ json: rv });
        const ui = { ...aboutMessages, message };
        await set(doAsyncConfirmDialogAtom, ui);
    }
);

function FormattedJson({ json }: { json: string; }) {
    try {
        const rvObj = JSON.parse(json) as GeneralInfoResult;
        let { templatePath, products, copy } = rvObj;
        const copyright = copy.replaceAll('�', '©').split('/');
        templatePath = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima ipsum rerum molestias voluptatum accusamus porro dolorem temporibus laboriosam quia ipsam ut odio omnis eligendi doloremque at, illum quos mollitia praesentium!";
        return (
            <div className="w-full text-xs grid gap-4">
                <div>
                    <div className="mb-1 font-semibold">
                        Installed products:
                    </div>
                    {products.map(({ product, version }) => (
                        <div key={product}>
                            {product}: version {version}
                        </div>
                    ))}
                </div>

                <div className="">
                    <div className="mb-1 font-semibold">
                        GPO templates path
                    </div>
                    <Textarea className={classNames(optionInputClasses, inputRingClasses)} style={{ 'fieldSizing': 'content' } as React.CSSProperties} value={templatePath} readOnly tabIndex={-1} />
                </div>

                <div className="text-[0.65rem] grid">
                    {copyright.map((line, index) => (<div className="text-center" key={index}>{line}</div>))}
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="text-xs flex items-center gap-x-2">
                <AlertOctagon className="size-6 text-red-500" />
                Cannot get information about installed applications
            </div>
        );
    }
}

const optionInputClasses = "\
px-2 py-1 min-h-7 w-full resize-none \
\
text-mani-foreground font-normal bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-none";


// Default reply from napi to test wo/ electron:
const defAbount = "{\"curVer\": \"2160128\",\"apiVer\":\"2250613\",\"templatePath\":\"\",\"products\":[{\"product\":\"Altus AD Workstation\",\"version\":\"4.1.0.1083\"},{\"product\":\"Password Manager\",\"version\":\"4.1.0.1083\"}],\"copy\":\"Copyright � 1996-2025 HID Global Corporation/ASSA ABLOY AB\"}";

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
