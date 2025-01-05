import { convertJsToXml, type CatalogFile, type FileMani, type Mani, prepareNewFc4Xml, prepareNewMani4Xml } from "pm-manifest";

export type ConvertToXmlStringResult =
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
        return { xml };
    } catch (error) {
        return { error: 'Failed to convert' + error };
    }
}
