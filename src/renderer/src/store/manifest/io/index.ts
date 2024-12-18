import { convertJsToXml, type CatalogFile, type FileMani, type Mani, prepareNewFc4Xml, prepareNewMani4Xml, showError } from '@/store/manifest';
//import { fileDownload } from '@/utils/file-download';

type ConvertToXmlStringResult =
    | {
        error: string;
        xml?: undefined;
    }
    | {
        xml: string;
        error?: undefined;
    };

export function convertToXmlString(params: { mani?: FileMani.Manifest, fc?: CatalogFile.Root; }): ConvertToXmlStringResult {
    try {
        // 1.

        let objForXml: object | undefined;

        if (params.mani) {
            objForXml = prepareNewMani4Xml(params.mani as Mani.Manifest);
        } else if (params.fc) {
            objForXml = prepareNewFc4Xml(params.fc);
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
