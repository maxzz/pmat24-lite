import { type Mani, type FileMani, type CatalogFile, type ConvertToXmlStringResult, convertToXmlString, createGuid, filterOneLevelEmptyValues, showError, toManiFileFormat } from "@/store/manifest";
import { type FileUs, type FileUsAtom  } from "@/store/store-types";
import { type FceAtoms } from "@/store/1-atoms/4-field-catalogs";
import { type ManiAtoms } from "@/store/1-file-mani-atoms/9-types";
import { getManiDispNameAtomAtom } from "@/store/1-file-mani-atoms/3-options";
import { doManiNameDlgAtom } from "../../4-do-delete-rename-reveal-quit";
import { stopIfInvalidAny } from "../1-stop-if-validation-failed";
import { fceItemValueToCatalogItemInFile, packManifest } from "../2-pack";
import { printTestManifest } from "./8-save-utils";

/**
 * @param validate - validation is ommited when we get xml after cpass created
 * @returns xml string or undefined if validation failed
 */
export async function fileUsToXmlString(fileUsAtom: FileUsAtom, validate: boolean, getset: GetSet): Promise<string | undefined> {
    const fileUs = getset.get(fileUsAtom);

    let res: ConvertToXmlStringResult | undefined =
        fileUs.fceAtomsForFcFile
            ? getFcContentText(fileUs.fceAtomsForFcFile, validate, getset)
            : await getManiContentText(fileUs, fileUsAtom, getset.get(fileUs.maniAtomsAtom), validate, getset);
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

async function getManiContentText(fileUs: FileUs, fileUsAtom: FileUsAtom, maniAtoms: ManiAtoms | null, validate: boolean, getset: GetSet): Promise<ConvertToXmlStringResult | undefined> {
    if (!maniAtoms) {
        throw new Error('No maniAtoms');
    }

    // First do validation and then ask for manifest name

    if (validate && stopIfInvalidAny(maniAtoms, getset)) {
        return;
    }

    // Check name before putting all to xml.

    const maniNameAtom = getset.set(getManiDispNameAtomAtom, fileUsAtom);
    const maniName = maniNameAtom && getset.get(maniNameAtom).data;
    const cofirmNameOption = false; //TODO: add it to options dialog
    if (validate && !maniName || cofirmNameOption) { // If we save content for change password form then we need to confirm name
        const okManiName = await getset.set(doManiNameDlgAtom, fileUsAtom);
        if (!okManiName) {
            return;
        }
    }

    // Now validation done

    const newMani: Partial<Mani.Manifest> = { forms: [], };

    packManifest({ fileUs, maniAtoms, newMani, getset });

    const root: FileMani.Manifest = toManiFileFormat(newMani);
    const rv = convertToXmlString({ mani: root });

    //printResult({ xml: rv.xml, inManiFormat: newMani, inFileFormat: root });
    return rv;
}

function getFcContentText(fceAtoms: FceAtoms, validate: boolean, { get }: GetSet): ConvertToXmlStringResult | undefined {
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
