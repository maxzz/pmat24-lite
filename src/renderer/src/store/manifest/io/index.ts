import { CatalogFile, FileMani, makeXML, Mani, showError } from '@/store/manifest';
//import { fileDownload } from '@/utils/file-download';

type ConvertToXmlResult =
    {
        error: string;
        xml?: undefined;
    } | {
        xml: string;
        error?: undefined;
    };

export function convertToXml(mani: FileMani.Manifest | CatalogFile.Root): ConvertToXmlResult {
    let xml = '';
    try {
        // 1.
        xml = makeXML(mani as Mani.Manifest) || '';
        //console.log('%c---------new xml from converted---------', 'color: green', `\n${xml}`);
        // 2.
        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
        return { xml };
    } catch (error) {
        showError({ error });
        return { error: 'failed to convert' };
    }
}
