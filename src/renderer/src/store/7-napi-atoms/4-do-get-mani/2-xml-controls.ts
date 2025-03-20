import { atom } from "jotai";
import { type CatalogFile, type Mani, type Meta, buildManiMetaForms, parseXMLFile } from "@/store/manifest";
import { maniXmlStrAtom } from "./1-do-get-mani";

export type XmlParseResult = {
    mani: Mani.Manifest | undefined;
    fcat: CatalogFile.Root | undefined;
    meta: Meta.Form[];
};

export const xmlControlsAtom = atom<XmlParseResult | null>(
    (get) => {
        const sawManiXml = get(maniXmlStrAtom);
        if (!sawManiXml) {
            return null;
        }

        const res = xmlToManifestAndMeta(sawManiXml);
        return res;        
    }
);

function xmlToManifestAndMeta(cnt: string): XmlParseResult {
    const res = parseXMLFile(cnt);
    return {
        mani: res.mani,
        fcat: res.fcat,
        meta: buildManiMetaForms(res.mani?.forms),
    }
}
