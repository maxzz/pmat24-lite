import { type Getter, type Setter } from "jotai";
import { type FileUs, type FileUsAtom, type FceAtoms, fceItemValueToCatalogItemInFile } from "@/store";
import { type ManiAtoms } from "../../../9-types";
import { type CatalogFile, type FileMani, type Mani, convertToXml, createGuid } from "@/store/manifest";
import { stopIfInvalidAny } from "../1-stop-if-validation-failed";
import { packManifest } from "./1-pack-manifest";
import { toManiFileFormat } from "./3-to-mani-file-format";
import { filterEmptyValues } from "./7-filter-empty-values";
//import { printTestManifest } from "./8-print-test-manifest";

export function createXmlText(fileUsAtom: FileUsAtom, get: Getter, set: Setter): string | undefined {
    const fileUs = get(fileUsAtom);

    if (fileUs.fceAtomsForFcFile) {
        const rv = getFcContentText(fileUs, fileUsAtom, fileUs.fceAtomsForFcFile, get, set);
        return rv;
    }

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (maniAtoms) {
        const rv = getManiContentText(fileUs, fileUsAtom, maniAtoms, get, set);
        return rv;
    }
}

function getManiContentText(fileUs: FileUs, fileUsAtom: FileUsAtom, maniAtoms: ManiAtoms, get: Getter, set: Setter): string | undefined {
    if (stopIfInvalidAny(maniAtoms, get, set)) {
        return;
    }

    // Now validation done

    const newMani: Partial<Mani.Manifest> = {
        forms: [],
    };

    packManifest({ fileUs, fileUsAtom, maniAtoms, newMani, get, set });

    const fileMani4Xml: FileMani.Manifest = toManiFileFormat(newMani);
    const { xml, error } = convertToXml({ mani: fileMani4Xml });

    console.log('xml', xml);

    if (error || !xml) {
        console.error('Error converting to xml', error);
        return;
    }

    // printTestManifest(fileMani4Xml);
    // printTestManifest(newMani);

    return xml;
}

function getFcContentText(fileUs: FileUs, fileUsAtom: FileUsAtom, fceAtoms: FceAtoms, get: Getter, set: Setter): string | undefined {

    const aboutId = get(fceAtoms.aboutAtom);
    const items = get(fceAtoms.allAtom);

    const fce4Xml: CatalogFile.Root = {
        descriptor: { id: aboutId || createGuid() },
        names: items.map(item => filterEmptyValues(fceItemValueToCatalogItemInFile(item.fieldValue))).filter(Boolean),
    };

    const { xml, error } = convertToXml({ fc: fce4Xml });

    console.log('xml', xml);

    if (error || !xml) {
        console.error('Error converting to xml', error);
        return;
    }

    return xml;
}
