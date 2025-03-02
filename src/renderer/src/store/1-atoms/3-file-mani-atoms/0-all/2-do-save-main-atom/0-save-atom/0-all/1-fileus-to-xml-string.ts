import { type Getter, type Setter } from "jotai";
import { type FileUs, type FileUsAtom, type FceAtoms, } from "@/store";
import { type ManiAtoms } from "../../../../9-types";
import { type CatalogFile, type ConvertToXmlStringResult, type FileMani, type Mani, convertToXmlString, createGuid, showError } from "@/store/manifest";
import { stopIfInvalidAny } from "../../1-stop-if-validation-failed";
import { packManifest, toManiFileFormat } from "../1-pack-mani";
import { filterEmptyValues } from "./8-save-utils";
import { fceItemValueToCatalogItemInFile } from "../../2-pack";
// import { printTestManifest } from "./8-save-utils";

export function fileUsToXmlString(fileUsAtom: FileUsAtom, get: Getter, set: Setter): string | undefined {
    const fileUs = get(fileUsAtom);
    
    let res: ConvertToXmlStringResult | undefined;

    if (fileUs.fceAtomsForFcFile) {
        // FC
        res = getFcContentText(fileUs.fceAtomsForFcFile, get, set);
    } else {
        // Manifest
        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (maniAtoms) {
            res = getManiContentText(fileUs, maniAtoms, get, set);
        }
    }

    if (res) {
        const { xml, error } = res;

        if (error || !xml) {
            console.error('Error converting to xml', error);
            showError({ error });
            return;
        }

        //console.log('%c---------new xml from converted---------', 'color: green', `\n${xml}`);
        return xml;
    }
}

function getManiContentText(fileUs: FileUs, maniAtoms: ManiAtoms, get: Getter, set: Setter): ConvertToXmlStringResult | undefined {
    if (stopIfInvalidAny(maniAtoms, get, set)) {
        return;
    }

    // Now validation done

    const newMani: Partial<Mani.Manifest> = {
        forms: [],
    };

    packManifest({ fileUs, maniAtoms, newMani, get, set });

    const root: FileMani.Manifest = toManiFileFormat(newMani);
    const rv = convertToXmlString({ mani: root });

    // if (rv.xml) { printTestManifest(fileMani4Xml); printTestManifest(newMani); }

    return rv;
}

function getFcContentText(fceAtoms: FceAtoms, get: Getter, set: Setter): ConvertToXmlStringResult | undefined {
    const aboutId = get(fceAtoms.aboutAtom);
    const items = get(fceAtoms.allAtom);

    const root: CatalogFile.Root = {
        descriptor: { id: aboutId || createGuid() },
        names: items.map(item => filterEmptyValues(fceItemValueToCatalogItemInFile(item.fieldValue))).filter(Boolean),
    };

    const rv = convertToXmlString({ fc: root });
    return rv;
}
