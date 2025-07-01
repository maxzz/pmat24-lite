import { type Getter, type Setter } from "jotai";
import { type CatalogFile, type ConvertToXmlStringResult, type FileMani, type Mani, convertToXmlString, createGuid, showError } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type FceAtoms } from "@/store/1-atoms/4-field-catalogs";
import { type ManiAtoms } from "../../../9-types";
import { getManiDispNameAtomAtom } from "../../../4-options";
import { doManiNameDlgAtom } from "@/store/1-atoms/7-dialogs";
import { stopIfInvalidAny } from "../1-stop-if-validation-failed";
import { fceItemValueToCatalogItemInFile, filterOneLevelEmptyValues, packManifest, toManiFileFormat } from "../2-pack";
import { printTestManifest } from "./8-save-utils";

/**
 * @param validate - validation is ommited when we get xml after cpass created
 * @returns xml string or undefined if validation failed
 */
export async function fileUsToXmlString(fileUsAtom: FileUsAtom, validate: boolean, get: Getter, set: Setter): Promise<string | undefined> {
    const fileUs = get(fileUsAtom);

    let res: ConvertToXmlStringResult | undefined =
        fileUs.fceAtomsForFcFile
            ? getFcContentText(fileUs.fceAtomsForFcFile, validate, get, set)
            : await getManiContentText(fileUs, fileUsAtom, get(fileUs.maniAtomsAtom), validate, get, set);
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

async function getManiContentText(fileUs: FileUs, fileUsAtom: FileUsAtom, maniAtoms: ManiAtoms | null, validate: boolean, get: Getter, set: Setter): Promise<ConvertToXmlStringResult | undefined> {
    if (!maniAtoms) {
        throw new Error('No maniAtoms');
    }

    // Check name before putting all to xml.

    const maniNameAtom = set(getManiDispNameAtomAtom, fileUsAtom);
    const maniName = maniNameAtom && get(maniNameAtom).data;
    const cofirmNameOption = false; //TODO: add it to options dialog
    if (validate && !maniName || cofirmNameOption) { // If we save content for change password form then we need to confirm name
        const okManiName = await set(doManiNameDlgAtom, fileUsAtom);
        if (!okManiName) {
            return;
        }
    }

    // Validation

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
