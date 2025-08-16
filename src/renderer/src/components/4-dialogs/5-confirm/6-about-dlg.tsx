import { atom } from "jotai";
import { classNames } from "@/utils";
import { Textarea } from "@/ui/shadcn";
import { inputRingClasses, optionInputClasses } from "@/ui/local-ui";
import { AlertOctagon } from "lucide-react";
import { aboutMessages, doAsyncExecuteConfirmDialogAtom } from "@/store/4-dialogs";
import { asyncGetAboutInfo } from "@/store/7-napi-atoms";
import { type ProductInfo, type GeneralInfoResult } from "@shared/ipc-types";

export const doAboutDialogAtom = atom(null,
    async (get, set) => {
        const json = await asyncGetAboutInfo(); // console.log('about.info:', json);
        const ui = { ...aboutMessages, message: FormattedJson({ json }) };
        await set(doAsyncExecuteConfirmDialogAtom, ui);
    }
);

function FormattedJson({ json }: { json: string; }) {
    try {
        const obj = JSON.parse(json) as GeneralInfoResult;
        let { products = [], templatePath = '', copy = '' } = obj;

        products.unshift({ product: 'Password Manager Admin Tool', version: import.meta.env.VITE_PMAT_VERSION || 'None' });
        if (products.length === 1) {
            products.push({ product: 'No other products installed', version: '' });
        } else {
            products.sort((a, b) => a.product.localeCompare(b.product));
        }

        const copyright = copy.replaceAll('�', '©').split('/');

        return <AboutBody products={products} templatePath={templatePath} copyright={copyright} />; // This will be rendered since it is a React component
    } catch (error) {
        return <AboutError />;
    }
}

function AboutBody({ products, templatePath, copyright }: { products: ProductInfo[]; templatePath: string; copyright: string[]; }) {
    return (
        <div className="w-full text-xs grid gap-4">
            <div>
                <div className="mb-1 1font-semibold">
                    Installed products:
                </div>
                <Products products={products} />
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
}

function AboutError() {
    return (
        <div className="text-xs flex items-center gap-x-2">
            <AlertOctagon className="size-6 text-red-500" />
            Cannot get information about installed applications
        </div>
    );
}

function Products({ products }: { products: ProductInfo[]; }) {
    return (<>
        {products.map(
            ({ product, version }) => (
                <div key={product}> {product}{version ? ': version' : ''} {version} </div>
            ))
        }
    </>);
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
