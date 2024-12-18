import { convertJsToXml, type CatalogFile, type FileMani, type Mani, prepareNewFc4Xml, prepareNewMani4Xml, showError } from '@/store/manifest';
//import { fileDownload } from '@/utils/file-download';

type ConvertToXmlResult =
    | {
        error: string;
        xml?: undefined;
    }
    | {
        xml: string;
        error?: undefined;
    };

export function convertToXml(params: { mani?: FileMani.Manifest, fc?: CatalogFile.Root; }): ConvertToXmlResult {
    try {
        // 1.

        let objForXml: object | undefined;

        if (params.mani) {
            objForXml = prepareNewMani4Xml(params.mani as Mani.Manifest);
        } else if (params.fc) {
            objForXml = prepareNewFc4Xml2(params.fc);
        }

        if (!objForXml) {
            return { error: 'failed to convert' };
        }

        const xml = convertJsToXml(objForXml) || '';
        //console.log('%c---------new xml from converted---------', 'color: green', `\n${xml}`);

        // 2.
        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
        return { xml };
    } catch (error) {
        showError({ error });
        return { error: 'failed to convert' };
    }
}

const ATTRS: string = "_attributes";

function hasKeys(obj?: object): boolean {
    return !!obj && !!Reflect.ownKeys(obj).length;
}

export function prepareNewFc4Xml2(fc: CatalogFile.Root): CatalogFile.Root {
    const { descriptor, names, ...rest } = fc;
    const rv: any = { names: [] };

    // 1. Customization
    if (hasKeys(descriptor)) {
        rv.descriptor = { [ATTRS]: descriptor };
    }

    // 2. Names
    if (names?.length) {
        rv.names = {
            name: names.map(
                (name: CatalogFile.ItemInFile) => {
                    return { [ATTRS]: name };
                }
            )
        };
    }

    return { ...rv, ...rest, };
}
