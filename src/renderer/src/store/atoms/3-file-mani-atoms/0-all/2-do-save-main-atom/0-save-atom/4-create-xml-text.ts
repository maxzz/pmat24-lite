import { Getter, Setter } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { convertToXml, type Mani } from "@/store/manifest";
import { stopIfAnyErrors } from "../1-stop-if-errors";
import { packManifest } from "./1-pack-manifest";
//import { printTestManifest } from "./8-print-test-manifest";
import { toManiFileFormat } from "./3-to-mani-file-format";

export function createXmlText(fileUsAtom: FileUsAtom, get: Getter, set: Setter): string | undefined {
    const fileUs = get(fileUsAtom);

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (!maniAtoms || stopIfAnyErrors(maniAtoms, get, set)) {
        return;
    }

    // Now validation done

    const newMani: Partial<Mani.Manifest> = {
        forms: [],
    };

    packManifest({ fileUs, fileUsAtom, maniAtoms, newMani, get, set });

    const fileMani = toManiFileFormat(newMani);

    const { xml, error } = convertToXml(fileMani);

    console.log('xml', xml);

    if (error || !xml) {
        console.error('Error converting to xml', error);
        return;
    }

    // printTestManifest(fileMani);
    // printTestManifest(newMani);

    return xml;
}
