import { Getter, Setter } from "jotai";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { CatalogFile, convertToXml, FileMani, type Mani } from "@/store/manifest";
import { stopIfInvalidAny } from "../1-stop-if-validation-failed";
import { packManifest } from "./1-pack-manifest";
//import { printTestManifest } from "./8-print-test-manifest";
import { toManiFileFormat } from "./3-to-mani-file-format";
import { type ManiAtoms } from "../../../9-types";
import { Description } from "@radix-ui/react-dialog";

export function createXmlText(fileUsAtom: FileUsAtom, get: Getter, set: Setter): string | undefined {
    const fileUs = get(fileUsAtom);

    if (fileUs.fceAtomsForFcFile) {
        const rv = getFcContent(fileUs, fileUsAtom, get, set);
        return rv;
    }

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (maniAtoms) {
        const rv = getManiContent(fileUs, fileUsAtom, maniAtoms, get, set);
        return rv;
    }
}

function getManiContent(fileUs: FileUs, fileUsAtom: FileUsAtom, maniAtoms: ManiAtoms, get: Getter, set: Setter): string | undefined {
    if (stopIfInvalidAny(maniAtoms, get, set)) {
        return;
    }

    // Now validation done

    const newMani: Partial<Mani.Manifest> = {
        forms: [],
    };

    packManifest({ fileUs, fileUsAtom, maniAtoms, newMani, get, set });

    const fileMani4Xml: FileMani.Manifest = toManiFileFormat(newMani);
    const { xml, error } = convertToXml({mani: fileMani4Xml});

    console.log('xml', xml);

    if (error || !xml) {
        console.error('Error converting to xml', error);
        return;
    }

    // printTestManifest(fileMani4Xml);
    // printTestManifest(newMani);

    return xml;
}

function getFcContent(fileUs: FileUs, fileUsAtom: FileUsAtom, get: Getter, set: Setter): string | undefined {
    const fceAtoms = fileUs.fceAtomsForFcFile;
    const fce4Xml: CatalogFile.Root = {
        descriptor: { id: 'dummy' },
        names: [],
    };

    // const { xml, error } = convertToXml(fce4Xml);
    return;
}
