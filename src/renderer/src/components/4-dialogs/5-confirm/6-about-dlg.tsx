import { atom } from "jotai";
import { classNames, envBuildVersion, envModifiedDate } from "@/utils";
import { Textarea } from "@/ui/shadcn";
import { inputRingClasses, optionInputClasses } from "@/ui/local-ui";
import { IconL_AlertOctagon } from "@/ui/icons";
import { aboutMessages, doAsyncExecuteConfirmDialogAtom } from "@/store/4-dialogs-atoms";
import { asyncGetAboutInfo } from "@/store/7-napi-atoms";
import { type ProductInfo, type GeneralInfoResult } from "@shared/ipc-types";

export const doAboutDialogAtom = atom(null,
    async (get, set) => {
        const json = await asyncGetAboutInfo(); // console.log('about.info:', json);
        const ui = { ...aboutMessages, message: FormattedJsxFromJson({ json }) };
        await set(doAsyncExecuteConfirmDialogAtom, ui);
    }
);

type ProductInfoEx = ProductInfo & { builtOn?: string; };

function FormattedJsxFromJson({ json }: { json: string; }) {
    try {
        const obj = JSON.parse(json) as GeneralInfoResult;
        let { products = [], templatePath = '', copy = '' } = obj;
        const productsEx: ProductInfoEx[] = products;

        productsEx.unshift({ product: 'Password Manager Admin Tool', version: envBuildVersion(), builtOn: `Built on ${envModifiedDate()}` });
        if (productsEx.length === 1) {
            productsEx.push({ product: 'No other products installed', version: '' });
        } else {
            productsEx.sort((a, b) => a.product.localeCompare(b.product));
        }

        const copyright = copy.replaceAll('�', '©').split('/');

        return (
            <AboutBody
                products={productsEx}
                templatePath={templatePath}
                copyright={copyright}
            />
        ); // This will be rendered since it is a React component
    } catch (error) {
        return (
            <div className="text-xs flex items-center gap-x-2">
                <IconL_AlertOctagon className="size-6 text-red-500" />
                Cannot get information about installed applications
            </div>
        );
    }
}

function AboutBody({ products, templatePath, copyright }: { products: ProductInfoEx[]; templatePath: string; copyright: string[]; }) {
    return (
        <div className="w-full text-xs grid gap-4 cursor-default">
            <div>
                <div className="mb-1.5 1font-semibold">
                    Installed products:
                </div>
                {products.map(
                    ({ product, version, builtOn: buildAt }) => (
                        <div key={product} title={buildAt}> {product}{version ? ': version' : ''} <span>{version}</span> </div>
                    ))
                }
            </div>

            <div>
                <div className="mb-1.5 1font-semibold">
                    GPO templates path (read-only)
                </div>
                <GpoTempatesPath templatePath={templatePath} />
            </div>

            <div className="text-[0.65rem] grid">
                {copyright.map(
                    (line, index) => (
                        <div className="text-center" key={index}>{line}</div>
                    ))
                }
            </div>
        </div>
    );
}

function GpoTempatesPath({ templatePath }: { templatePath: string; }) {
    return (
        <Textarea
            className={classNames("text-xs", optionInputClasses, inputRingClasses)}
            style={{ 'fieldSizing': 'content' } as React.CSSProperties}
            defaultValue={templatePath}
            readOnly
            tabIndex={-1}
        />
    );
}
