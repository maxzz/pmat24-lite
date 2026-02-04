import { type Mani, type FileMani, type CatalogFile, type ConvertToXmlStringResult, convertToXmlString, createGuid, filterOneLevelEmptyValues, showError, toManiFileFormat } from "@/store/8-manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type FceAtoms } from "@/store/3-field-catalog-atoms";
import { type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";
import { getManiDispNameAtomAtom } from "@/store/2-file-mani-atoms/3-options";
import { doManiNameDlgAtom } from "../../5-do-delete-rename-reveal-quit";
import { stopIfInvalidAny } from "../1-stop-if-validation-failed";
import { fceItemValueToCatalogItemInFile, packManifest } from "../2-pack";
import { print_TestManifest } from "./8-save-print";

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

    // Check name before putting all to xml.

    const okName = await gotManifestName(fileUsAtom, validate, getset);
    if (!okName) {
        return;
    }

    // First do validation and then ask for manifest name

    if (validate && stopIfInvalidAny(maniAtoms, getset)) {
        return;
    }

    // Now validation done

    const newMani: Partial<Mani.Manifest> = { forms: [], };

    packManifest({ fileUs, maniAtoms, newMani, getset });

    const root: FileMani.Manifest = toManiFileFormat(newMani);
    const rv = convertToXmlString({ mani: root });

    print_XmlResult({ xml: rv.xml, inManiFormat: newMani, inFileFormat: root });
    return rv;
}

async function gotManifestName(fileUsAtom: FileUsAtom, validate: boolean, getset: GetSet): Promise<boolean | undefined> {
    if (!validate) {
        return true;
    }

    const cofirmNameOption = false; //TODO: add it to options dialog

    const maniNameAtom = getset.set(getManiDispNameAtomAtom, fileUsAtom);
    const maniName = maniNameAtom && getset.get(maniNameAtom).data;

    if (!maniName || cofirmNameOption) { // If we save content for change password form then we need to confirm name
        const okManiName = await getset.set(doManiNameDlgAtom, { fileUsAtom, provideDefaultName: true });
        if (!okManiName) {
            return false;
        }
    }

    return true;
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

function print_XmlResult({ xml, inManiFormat, inFileFormat }: { xml: string | undefined; inManiFormat: Partial<Mani.Manifest>; inFileFormat: Mani.Manifest | FileMani.Manifest; }) {
    if (xml) {
        print_TestManifest(inFileFormat, { label: '🚀 ~ inFileFormat:\n', labelCss: 'color: orange;', bodyCss: 'color: darkslategray; font-size: 0.5rem', bodyCollapsed: true, dropEmptyvalues: true });
        print_TestManifest(inManiFormat, { label: '🚀 ~ inManiFormat:\n', labelCss: 'color: magenta;', bodyCss: 'color: forestgreen; font-size: 0.5rem', bodyCollapsed: true, dropEmptyvalues: true });
    }
}
