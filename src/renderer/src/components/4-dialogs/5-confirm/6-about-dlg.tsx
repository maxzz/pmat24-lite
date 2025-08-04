import { atom } from "jotai";
import { classNames } from "@/utils";
import { Textarea } from "@/ui/shadcn";
import { inputRingClasses, optionInputClasses } from "@/ui/local-ui";
import { AlertOctagon } from "lucide-react";
import { aboutMessages, doAsyncConfirmDialogAtom } from "@/store/1-atoms/7-dialogs";
import { asyncGetAboutInfo } from "@/store/7-napi-atoms";
import { type GeneralInfoResult } from "@shared/ipc-types";

export const doAboutDialogAtom = atom(null,
    async (get, set) => {
        const json = await asyncGetAboutInfo(); // console.log('about.info:', json);
        const message = FormattedJson({ json });
        const ui = { ...aboutMessages, message };
        await set(doAsyncConfirmDialogAtom, ui);
    }
);

function FormattedJson({ json }: { json: string; }) {
    try {
        const obj = JSON.parse(json) as GeneralInfoResult;
        let { products, templatePath = '', copy = '' } = obj;
        const copyright = copy.replaceAll('�', '©').split('/');
        return (
            <div className="w-full text-xs grid gap-4">
                <div>
                    <div className="mb-1 1font-semibold">
                        Installed products:
                    </div>
                    {products
                        ? (products.map(({ product, version }) => (
                            <div key={product}> {product}: version {version} </div>
                        )))
                        : (
                            <div className="text-center">No products installed</div>
                        )
                    }
                </div>

                <div>
                    <div className="mb-1 1font-semibold">
                        GPO templates path
                    </div>
                    <GpoTempatesPath templatePath={templatePath} />
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

function GpoTempatesPath({ templatePath }: { templatePath: string; }) {
    return (
        <Textarea
            className={classNames("text-xs", optionInputClasses, inputRingClasses)}
            style={{ 'fieldSizing': 'content' } as React.CSSProperties}
            value={templatePath}
            readOnly
            tabIndex={-1}
        />
    );
}
