import { type Getter, type Setter } from "jotai";
import { type FileUs, type FileUsAtom, type FceAtoms, } from "@/store";
import { type ManiAtoms } from "../../../9-types";
import { type CatalogFile, type ConvertToXmlStringResult, type FileMani, type Mani, convertToXmlString, createGuid, showError } from "@/store/manifest";
import { stopIfInvalidAny } from "../1-stop-if-validation-failed";
import { fceItemValueToCatalogItemInFile, filterOneLevelEmptyValues, packManifest, toManiFileFormat } from "../2-pack";
import { printTestManifest } from "./8-save-utils";

/**
 * @param validate - validation is ommited when we get xml after cpass created
 * @returns xml string or undefined if validation failed
 */
export function fileUsToXmlString(fileUsAtom: FileUsAtom, validate: boolean, get: Getter, set: Setter): string | undefined {
    const fileUs = get(fileUsAtom);

    let res: ConvertToXmlStringResult | undefined =
        fileUs.fceAtomsForFcFile
            ? getFcContentText(fileUs.fceAtomsForFcFile, validate, get, set)
            : getManiContentText(fileUs, get(fileUs.maniAtomsAtom), validate, get, set);
    if (!res) {
        return;
    }

    const { xml, error } = res;
    if (error || !xml) {
        console.error('Error converting to xml', error);
        showError({ error });
        return;
    }

    return xml;
}

function getManiContentText(fileUs: FileUs, maniAtoms: ManiAtoms | null, validate: boolean, get: Getter, set: Setter): ConvertToXmlStringResult | undefined {
    if (!maniAtoms) {
        throw new Error('No maniAtoms');
    }

    if (validate && stopIfInvalidAny(maniAtoms, get, set)) {
        return;
    }

    // Now validation done

    const newMani: Partial<Mani.Manifest> = { forms: [], };

    packManifest({ fileUs, maniAtoms, newMani, get, set });

    const root: FileMani.Manifest = toManiFileFormat(newMani);
    const rv = convertToXmlString({ mani: root });

    //printResult({ xml: rv.xml, inManiFormat: newMani, inFileFormat: root });
    return rv;
}

function getFcContentText(fceAtoms: FceAtoms, validate: boolean, get: Getter, set: Setter): ConvertToXmlStringResult | undefined {
    const aboutId = get(fceAtoms.aboutAtom);
    const items = get(fceAtoms.allAtom);

    const root: CatalogFile.Root = {
        descriptor: { id: aboutId || createGuid() },
        names: items.map(item => filterOneLevelEmptyValues(fceItemValueToCatalogItemInFile(item.fieldValue))).filter(Boolean),
    };

    const rv = convertToXmlString({ fc: root });
    return rv;
}

function printXmlResult({ xml, inManiFormat, inFileFormat }: { xml: string | undefined; inManiFormat: Partial<Mani.Manifest>; inFileFormat: Mani.Manifest | FileMani.Manifest; }) {
    if (xml) {
        printTestManifest(inFileFormat);
        printTestManifest(inManiFormat);
    }
}
