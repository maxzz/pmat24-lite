import { classNames, envBuildVersion, envModifiedDate } from "@/utils";
import { Textarea } from "@/ui/shadcn";
import { inputRingClasses, optionInputClasses } from "@/ui/local-ui";
import { IconL_AlertOctagon } from "@/ui/icons";
import { type ProductInfo, type GeneralInfoResult } from "@shared/ipc-types";

type ProductInfoEx = ProductInfo & { builtOn?: string; };

export function DialogBodyFromJson({ jsonStr }: { jsonStr: string; }) { // Former FormattedJsxFromJson
    try {
        const obj = JSON.parse(jsonStr) as GeneralInfoResult;
        let { products = [], templatePath = '', copy = '' } = obj;
        const productsEx: ProductInfoEx[] = products;

        productsEx.unshift({ product: 'Password Manager Admin Tool', version: envBuildVersion(), builtOn: `Built on ${envModifiedDate()}` });
        if (productsEx.length === 1) {
            productsEx.push({ product: 'No other products installed', version: '' });
        } else {
            productsEx.sort((a, b) => a.product.localeCompare(b.product));
        }

        const copyright = copy.replaceAll('', '©').split('/');

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
        <div className="text-xs grid gap-4 cursor-default">
            <div>
                <div className="mb-0.5">
                    Installed products:
                </div>
                {products.map(
                    ({ product, version, builtOn: buildAt }) => (
                        <div key={product} title={buildAt}>
                            {product}{version ? ': version' : ''} <span className="font-semibold opacity-70">{version}</span>
                        </div>
                    ))
                }
            </div>

            <div>
                <div className="mb-0.5">
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
            className={classNames("w-full text-xs", optionInputClasses, inputRingClasses)}
            style={{ 'fieldSizing': 'content' } as React.CSSProperties}
            defaultValue={templatePath}
            readOnly
            tabIndex={-1}
        />
    );
}
