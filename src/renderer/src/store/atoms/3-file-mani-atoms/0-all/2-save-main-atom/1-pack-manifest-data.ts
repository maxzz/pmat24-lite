import { Getter, Setter } from "jotai";
import { FileUs, FileUsAtom } from "@/store/store-types";
import { FieldConv } from "../../1-fields/0-conv";
import { ManiConv } from "./2-conv-mani";
import { SubmitConv } from "../../2-submit/0-conv";
import { OptionsConv } from "../../4-options";
import { detectionAndOptionsForMani } from "./53-conv-mani-options";

export function packManifestData(get: Getter, set: Setter, fileUs: FileUs, fileUsAtom: FileUsAtom, newFilename?: string) {

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return;
    }

    const [loginFormAtoms, cpassFormAtoms] = maniAtoms;

    if (loginFormAtoms) {

        const submits = SubmitConv.fromAtoms(loginFormAtoms.submitAtoms, get, set);
        console.log('submits', JSON.stringify(submits, null, 2));

        const fields = loginFormAtoms.fieldsAtoms.map(
            (fieldAtoms) => {
                const metaField = fieldAtoms.metaField;

                const fromAtomValues = FieldConv.fromAtoms(fieldAtoms, get, set);
                const maniValues = FieldConv.forMani(fromAtomValues);
                const fileValues = ManiConv.fieldForFileMani(maniValues, fieldAtoms.metaField, undefined, false);
                return fileValues;
            }
        );
        // console.log('maniValues', JSON.stringify(fields, null, 2));

        const detectionAndOptionsRow = OptionsConv.fromAtoms(loginFormAtoms.optionsAtoms, get, set);
        let detectionAndOptions = detectionAndOptionsForMani(detectionAndOptionsRow);

        detectionAndOptions = Object.fromEntries(
            Object.entries(detectionAndOptions)
                .filter(([key, value]) => !!value)
        );

        const optionStr = JSON
            .stringify(detectionAndOptions, null, 2)
            .replace(/"names_ext":\s".*",/, '"names_ext": "...",');
        console.log('options', optionStr);

    }
}
